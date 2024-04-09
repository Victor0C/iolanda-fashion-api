import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CustomersService } from '../customers/customers.service'
import { ProceduresService } from '../procedures/procedures.service'
import { ProductsService } from '../products/products.service'
import { UsersService } from '../users/users.service'
import { BuildersForSales } from './buildersForSales'
import { CreateSaleDto } from './dto/create-sale.dto'
import { ResponseSale } from './dto/response-sale.dto'
import { ProductsSoldEntity } from './entities/productsSold.entity'
import { SaleEntity } from './entities/sale.entity'

@Injectable()
export class SalesService {
  constructor(
    private readonly userService: UsersService,
    private readonly procedureService: ProceduresService,
    private readonly productService: ProductsService,
    private readonly customerService: CustomersService,
    private readonly buildersForSales: BuildersForSales,
    @InjectRepository(SaleEntity) private readonly saleRepository: Repository<SaleEntity>,
    @InjectRepository(ProductsSoldEntity) private readonly productsSoldRepository: Repository<ProductsSoldEntity>,
  ) {}

  public async findOneSaleAllData(id: string): Promise<SaleEntity> {
    const sale = await this.saleRepository.findOne({
      where: { id },
       relations: { 
        user: true,
        customer:true,
        proceduresPerformed: true,
        productsSold: true
      }
    })

    if (!sale) throw new NotFoundException(`Sale not found (id: ${id})`)

    return sale
  }

  public async findOneSale(id: string): Promise<ResponseSale> {
    const sale = await this.findOneSaleAllData(id)

    return new ResponseSale(sale)
  }

  public async findAllSales(): Promise<ResponseSale[]> {
    const saleData = await this.saleRepository.find({relations: { 
      user: true,
      customer:true,
      proceduresPerformed: true,
      productsSold: true
    }})

    return saleData.map((sale) => new ResponseSale(sale))
  }

  public async createSale(id_user: string, createSaleDto: CreateSaleDto): Promise<ResponseSale> {
    if(!createSaleDto.proceduresPerformed && !createSaleDto.productsSold)
      throw new HttpException(`the sale needs at least one proceduresPerformed or productsSold`, HttpStatus.BAD_REQUEST)

    const buildproceduresPerformedSale = () => {if(createSaleDto.proceduresPerformed) return this.buildersForSales.proceduresPerformed(createSaleDto.proceduresPerformed)}
    const buildProductSoldSale = () => {if(createSaleDto.productsSold) return this.buildersForSales.CreateProductsSold(createSaleDto.productsSold)}

    const userSale = await this.userService.findUserAllData(id_user)
    const customerSale = await this.customerService.findOneCustomer(createSaleDto.id_customer)
    const proceduresPerformedSale = await buildproceduresPerformedSale()
    const productSoldSale = await buildProductSoldSale()
    const priceSale = this.buildersForSales.CreateSalePrice(proceduresPerformedSale, productSoldSale)

    const objectForEntity = {
      user: userSale,
      customer: customerSale,
      proceduresPerformed: proceduresPerformedSale,
      productsSold: productSoldSale,
      price: priceSale,
    }
    const saleEntity = new SaleEntity()
    Object.assign(saleEntity, objectForEntity as SaleEntity)

    const sale = await this.saleRepository.save(saleEntity)
    

    return new ResponseSale(sale)
  }

  public async deleteSale(id: string): Promise<void> {
    const sale = await this.findOneSaleAllData(id)

    await Promise.all(
      sale.productsSold.map(
       async (productsSold)=>{
        const productSoldAllData = await this.productsSoldRepository.findOne({where: { id: productsSold.id }, relations: { product: true }})
        return this.productService.updateProduct(productSoldAllData.product.id, {amount: productSoldAllData.product.amount + productsSold.amount})
      }
     )
    )

    await this.saleRepository.delete(id)
  }
}

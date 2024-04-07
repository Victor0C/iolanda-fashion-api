import { Injectable, NotFoundException } from '@nestjs/common'
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

  public async findOneSaleAllData(id: string) {
    const sale = await this.saleRepository.findOne({
      where: { id },
      relations: { user: true, proceduresPerformed: true, productsSold: true },
    })

    if (!sale) throw new NotFoundException(`Sale not found (id: ${id})`)

    return sale
  }

  public async findOneSale(id: string) {
    const sale = await this.findOneSaleAllData(id)

    return new ResponseSale(sale)
  }

  public async findAllSales() {
    const saleData = await this.saleRepository.find()

    return saleData.map((sale) => new ResponseSale(sale))
  }

  public async createSale(createSaleDto: CreateSaleDto) {

    const buildproceduresPerformedSale = () => {if(createSaleDto.proceduresPerformed) return this.buildersForSales.proceduresPerformed(createSaleDto.proceduresPerformed)}
    const buildProductSoldSale = () => {if(createSaleDto.productsSold) return this.buildersForSales.CreateProductsSold(createSaleDto.productsSold)}

    const userSale = await this.userService.findUserAllData(createSaleDto.id_user)
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

  public async deleteSale(id: string) {
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

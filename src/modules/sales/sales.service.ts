import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CustomersService } from '../customers/customers.service'
import { ProceduresService } from '../procedures/procedures.service'
import { ProductsService } from '../products/products.service'
import { UsersService } from '../users/users.service'
import { CreateProceduresPerformedDTO } from './dto/create-procedurePerformed.dto'
import { CreateProductsSoldDTO } from './dto/create-productsSold.dto'
import { CreateSaleDto } from './dto/create-sale.dto'
import { ResponseSale } from './dto/response-sale.dto'
import { ProceduresPerformedEntity } from './entities/proceduresPerformed.entity'
import { ProductsSoldEntity } from './entities/productsSold.entity'
import { SaleEntity } from './entities/sale.entity'
import { UpdateSaleDto } from './dto/update-sale.dto'

@Injectable()
export class SalesService {
  constructor(
    private readonly userService: UsersService,
    private readonly procedureService: ProceduresService,
    private readonly productService: ProductsService,
    private readonly customerService: CustomersService,
    @InjectRepository(SaleEntity) private readonly saleRepository: Repository<SaleEntity>,
  ) {}

  private async buildProceduresPerformed(
    createProceduresPerformedDTO: CreateProceduresPerformedDTO[],
  ) {
    const building = createProceduresPerformedDTO.map(
      async (procedurePerformed) => {
        const procedureData = await this.procedureService.findProcedureAllData(
          procedurePerformed.id,
        )
        const priceProcedurePerformed =
          procedureData.price * procedurePerformed.amount

        const objectForEntity = {
          name: procedureData.name,
          amount: procedurePerformed.amount,
          price: priceProcedurePerformed,
          procedure: procedureData,
        }

        const proceduresPerformedEntity = new ProceduresPerformedEntity()
        Object.assign(
          proceduresPerformedEntity,
          objectForEntity as ProceduresPerformedEntity,
        )

        return proceduresPerformedEntity
      },
    )

    const proceduresPerformed = await Promise.all(building)
    return proceduresPerformed
  }

  private async buildProductsSold(createProductsSoldDTO: CreateProductsSoldDTO[]){
    const building = createProductsSoldDTO.map(async (productSold) => {
      const productData = await this.productService.productServiceAllData(productSold.id)

      if(productData.amount < productSold.amount){
        throw new HttpException(`Not enough items in stock for ${productSold.amount} ${productData.name}`, HttpStatus.BAD_REQUEST)
      }

      await this.productService.updateProduct(productData.id, {amount: productData.amount - productSold.amount})

      const priceProductsSold = productData.price * productSold.amount

      const objectForEntity = {
        name: productData.name,
        amount: productSold.amount,
        price: priceProductsSold,
        product: productData,
      }

      const productSoldEntity = new ProductsSoldEntity()
      Object.assign(productSoldEntity, objectForEntity as ProductsSoldEntity)

      return productSoldEntity
    })

    const productsSold = await Promise.all(building)
    return productsSold
  }

  private buildPrice(
    proceduresPerformed: ProceduresPerformedEntity[], productsSold: ProductsSoldEntity[]){

    let price: number = 0

    proceduresPerformed.forEach((procedure: ProceduresPerformedEntity) => {
      price = Number(price) + Number(procedure.price)
    })

    productsSold.forEach((productsSold: ProductsSoldEntity) => {
      price = Number(price) + Number(productsSold.price)
    })

    return price
  }

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
    const userSale = await this.userService.findUserAllData(createSaleDto.id_user)
    const customerSale = await this.customerService.findOneCustomer(createSaleDto.id_customer)
    const proceduresPerformedSale = await this.buildProceduresPerformed(createSaleDto.proceduresPerformed)
    const productSoldSale = await this.buildProductsSold(createSaleDto.productsSold)
    const priceSale = this.buildPrice(proceduresPerformedSale, productSoldSale)

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

  public async updateSale(id: string, updateSaleDto: UpdateSaleDto) {
    const sale = await this.findOneSaleAllData(id)
    const priceSale = this.buildPrice(
      sale.proceduresPerformed,
      sale.productsSold,
    )
    sale.price = priceSale

    Object.assign(sale, updateSaleDto as SaleEntity)

    const updatedUser = await this.saleRepository.save(sale)

    return new ResponseSale(updatedUser)
  }

  public async deleteSale(id: string) {
    const sale = await this.findOneSaleAllData(id)
    console.log(sale)

    await Promise.all(
      sale.productsSold.map(
       async (productsSold)=>{
         const product = await this.productService.productServiceAllData(productsSold.id)
         return this.productService.updateProduct(product.id, {amount: product.amount + productsSold.amount})
       }
     )
    )

    await this.saleRepository.delete(id)
  }
}

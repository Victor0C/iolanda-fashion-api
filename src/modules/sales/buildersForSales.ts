import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ProceduresService } from "../procedures/procedures.service";
import { ProductsService } from "../products/products.service";
import { CreateProductsSoldDTO } from "./dto/create-productsSold.dto";
import { ProceduresPerformedEntity } from "./entities/proceduresPerformed.entity";
import { ProductsSoldEntity } from "./entities/productsSold.entity";

@Injectable()
export class BuildersForSales{
    constructor(private readonly procedureService: ProceduresService, private readonly productService: ProductsService){}

    public async CreateProductsSold(createProductsSoldDTO: CreateProductsSoldDTO[]): Promise<ProductsSoldEntity[]>{
        const building = createProductsSoldDTO.map(async (productSold) => {
        const productData = await this.productService.findProductAllData(productSold.id)
    
        if(productData.amount < productSold.amount){
            throw new HttpException(`Not enough items in stock for ${productSold.amount} ${productData.name} (id: ${productSold.id})`, HttpStatus.BAD_REQUEST)
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

    public async proceduresPerformed(proceduresPerformedDTO: CreateProductsSoldDTO[]): Promise<ProceduresPerformedEntity[]>{
      const building = proceduresPerformedDTO.map(
        async (updateProcedurePerformed) => {
          const procedureData = await this.procedureService.findOneProcedureAllData(updateProcedurePerformed.id)

          const priceProcedurePerformed = procedureData.price * updateProcedurePerformed.amount
    
          const objectForEntity = {
            name: procedureData.name,
            amount: updateProcedurePerformed.amount,
            price: priceProcedurePerformed,
            procedure: procedureData,
            }
    
          const proceduresPerformedEntity = new ProceduresPerformedEntity()
          Object.assign(proceduresPerformedEntity, objectForEntity as ProceduresPerformedEntity)

          return proceduresPerformedEntity
        }
      )
    
      const proceduresPerformed = await Promise.all(building)
      return proceduresPerformed
    }


    public CreateSalePrice(proceduresPerformed: ProceduresPerformedEntity[], productsSold: ProductsSoldEntity[]):number{
      let price: number = 0
    
      proceduresPerformed?.forEach((procedure: ProceduresPerformedEntity) => {price = Number(price) + Number(procedure.price)})
    
      productsSold?.forEach((productsSold: ProductsSoldEntity) => {price = Number(price) + Number(productsSold.price)})
    
      return price
    }
}
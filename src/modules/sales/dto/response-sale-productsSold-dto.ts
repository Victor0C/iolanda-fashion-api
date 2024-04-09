import { ApiProperty } from "@nestjs/swagger";
import { ProductsSoldEntity } from "../entities/productsSold.entity";

export class ResponseProducstSoldForSales{
    constructor(productSold: ProductsSoldEntity){
        productSold.price = productSold.price / 100

        delete productSold.product

        return productSold
    }

    @ApiProperty()
    id: string;
  
    @ApiProperty()
    name: string;
  
    @ApiProperty()
    amount: number;
  
    @ApiProperty()
    price: number;
}
import { ApiProperty } from "@nestjs/swagger";
import { ProductEntity } from "../entities/product.entity";

export class ResponseProduct {
    constructor(product: ProductEntity) {
        delete product.deletedAT

        product.price = product.price / 100

        return product
    }

    @ApiProperty()
    id: string

    @ApiProperty()
    name: string

    @ApiProperty()
    description: string

    @ApiProperty()
    amount: number

    @ApiProperty()
    price: number

    @ApiProperty()
    createdAT: String;

    @ApiProperty()
    updatedAT: string;
}
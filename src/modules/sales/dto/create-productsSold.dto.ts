import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateProductsSoldDTO {

    @IsString()
    @IsNotEmpty({ message: 'the id_productType field cannot be empty' })
    id: string

    @IsNumber()
    @IsNotEmpty({ message: 'the amount field cannot be empty' })
    amount: number

}
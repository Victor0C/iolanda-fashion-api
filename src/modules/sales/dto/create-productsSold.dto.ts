import { IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator"

export class CreateProductsSoldDTO {

    @IsUUID()
    @IsString()
    @IsNotEmpty({ message: 'the id_productType field cannot be empty' })
    id: string

    @IsNumber()
    @IsNotEmpty({ message: 'the amount field cannot be empty' })
    amount: number

}
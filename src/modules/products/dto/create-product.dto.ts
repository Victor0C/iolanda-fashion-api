import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateProductDto {

    @IsString()
    @IsNotEmpty({ message: 'the name field cannot be empty' })
    name: string

    @IsString()
    @IsNotEmpty({ message: 'the description field cannot be empty' })
    description: string

    @IsNumber()
    @IsNotEmpty({ message: 'the amount field cannot be empty' })
    amount: number

    @IsNumber()
    @IsNotEmpty({ message: 'the price field cannot be empty' })
    price: number
}

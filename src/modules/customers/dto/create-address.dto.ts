import { IsNotEmpty, IsNumber, IsString, Length } from "class-validator"

export class CreateAddressDTO {

    @Length(8, 8)
    @IsString()
    @IsNotEmpty({ message: 'the cep field cannot be empty' })
    cep: string

    @IsString()
    @IsNotEmpty({ message: 'the city field cannot be empty' })
    city: string

    @IsString()
    @IsNotEmpty({ message: 'the state field cannot be empty' })
    state: string

    @IsString()
    @IsNotEmpty({ message: 'the road field cannot be empty' })
    road: string

    @IsString()
    @IsNotEmpty({ message: 'the neighborhood field cannot be empty' })
    neighborhood: string

    @IsNumber()
    @IsNotEmpty({ message: 'the number field cannot be empty' })
    number: number

    @IsString()
    @IsNotEmpty({ message: 'the complement field cannot be empty' })
    complement: string

}
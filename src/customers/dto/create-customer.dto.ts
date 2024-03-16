import { IsBoolean, IsNotEmpty, IsString, Length, ValidateNested } from "class-validator"
import { AddressDTO } from "./address.dto"
import { Type } from "class-transformer"
import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from "typeorm"

export class CreateCustomerDto {

    @IsString()
    @IsNotEmpty({ message: 'the name field cannot be empty' })
    name: string

    @Length(11, 11)
    @IsString()
    @IsNotEmpty({ message: 'the cpf field cannot be empty' })
    cpf: string

    @Length(9, 9)
    @IsString()
    @IsNotEmpty({ message: 'the tel field cannot be empty' })
    tel: string

    @IsBoolean()
    @IsNotEmpty({ message: 'the whatsapp field cannot be empty' })
    whatsapp: boolean

    @ValidateNested()
    @Type(() => AddressDTO)
    @IsNotEmpty({ message: 'the address field cannot be empty' })
    address: AddressDTO
}

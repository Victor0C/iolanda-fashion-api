import { IsBoolean, IsNotEmpty, IsString, Length, ValidateNested } from "class-validator"
import { CreateAddressDTO } from "./create-address.dto"
import { Type } from "class-transformer"
import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from "typeorm"
import { ApiProperty } from "@nestjs/swagger"

export class CreateCustomerDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty({ message: 'the name field cannot be empty' })
    name: string

    @ApiProperty()
    @Length(11, 11,{message: 'the cpf must have 11 characters'})
    @IsString()
    @IsNotEmpty({ message: 'the cpf field cannot be empty' })
    cpf: string

    @ApiProperty()
    @Length(9, 9, {message: 'the tel must have 11 characters'})
    @IsString()
    @IsNotEmpty({ message: 'the tel field cannot be empty' })
    tel: string

    @ApiProperty()
    @IsBoolean()
    @IsNotEmpty({ message: 'the whatsapp field cannot be empty' })
    whatsapp: boolean

    @ApiProperty({type: () => CreateAddressDTO})
    @ValidateNested()
    @Type(() => CreateAddressDTO)
    @IsNotEmpty({ message: 'the address field cannot be empty' })
    address: CreateAddressDTO
}

import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, ValidateNested } from "class-validator";
import { CreateProceduresPerformedDTO } from "./create-procedurePerformed.dto";
import { CreateProductsSoldDTO } from "./create-productsSold.dto";

export class CreateSaleDto {

    @IsUUID()
    @IsString()
    @IsNotEmpty({ message: 'the id_user field cannot be empty' })
    id_user: string

    @IsUUID()
    @IsString()
    @IsNotEmpty({ message: 'the id_customer field cannot be empty' })
    id_customer: string

    @ValidateNested()
    @Type(() => CreateProceduresPerformedDTO)
    @ArrayMinSize(1)
    @IsArray()
    @IsOptional()
    proceduresPerformed: CreateProceduresPerformedDTO[]

    @ValidateNested()
    @Type(() => CreateProductsSoldDTO)
    @ArrayMinSize(1)
    @IsArray()
    @IsOptional()
    productsSold: CreateProductsSoldDTO[]
}

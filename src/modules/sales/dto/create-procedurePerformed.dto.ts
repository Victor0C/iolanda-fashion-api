import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator"

export class CreateProceduresPerformedDTO {
    
    @ApiProperty()
    @IsUUID()
    @IsString()
    @IsNotEmpty({ message: 'the id field cannot be empty' })
    id: string
    
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty({ message: 'the amount field cannot be empty' })
    amount: number

}
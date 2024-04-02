import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateProceduresPerformedDTO {
 
    @IsString()
    @IsNotEmpty({ message: 'the id field cannot be empty' })
    id: string
    
    @IsNumber()
    @IsNotEmpty({ message: 'the amount field cannot be empty' })
    amount: number

}
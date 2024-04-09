import { ApiProperty } from "@nestjs/swagger";
import { ProceduresPerformedEntity } from "../entities/proceduresPerformed.entity";

export class ResponseProceduresPerfomerdForSales{
    constructor(procedurePerformed: ProceduresPerformedEntity){
        procedurePerformed.price = procedurePerformed.price / 100
        
        delete procedurePerformed.procedure

        return procedurePerformed
    }

    @ApiProperty()
    id: string

    @ApiProperty()
    name: string

    @ApiProperty()
    amount: number

    @ApiProperty()
    price: number

}
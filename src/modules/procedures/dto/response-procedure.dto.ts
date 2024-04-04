import { ProcedureEntity } from "../entities/procedure.entity";

export class ResponseProcedure {
    constructor(procedure: ProcedureEntity ){
        delete procedure.deletedAT

        procedure.price = procedure.price / 100

        return procedure
    }
}
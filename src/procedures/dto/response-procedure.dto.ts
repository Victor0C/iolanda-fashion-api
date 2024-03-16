import { ProcedureEntity } from "../entities/procedure.entity";

export class ResponseProcedure {
    constructor(procedure: ProcedureEntity ){
        delete procedure.deletedAT

        return procedure
    }
}
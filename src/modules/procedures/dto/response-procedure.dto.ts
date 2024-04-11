import { ApiProperty } from '@nestjs/swagger';
import { ProcedureEntity } from '../entities/procedure.entity';

export class ResponseProcedure {
  constructor(procedure: ProcedureEntity) {
    delete procedure.deletedAT;

    return procedure;
  }

  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  createdAT: string;

  @ApiProperty()
  updatedAT: string;
}

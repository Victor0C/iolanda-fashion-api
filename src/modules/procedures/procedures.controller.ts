import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { CreateProcedureDto } from './dto/create-procedure.dto';
import { UpdateProcedureDto } from './dto/update-procedure.dto';
import { ProceduresService } from './procedures.service';
import { ResponseProcedure } from './dto/response-procedure.dto';

@Controller('/procedures')
export class ProceduresController {
  constructor(private readonly proceduresService: ProceduresService) { }

  @Get('/:id')
  public async findProcedure(@Param('id') id: string): Promise<ResponseProcedure> {

    return this.proceduresService.findProcedure(id)
  }

  @Get()
  public async findAllProcedures(): Promise<ResponseProcedure[]> {

    return this.proceduresService.findAllProcedures();
  }

  @Post()
  public async createProcedure(@Body() createProcedureDto: CreateProcedureDto): Promise<ResponseProcedure> {

    return this.proceduresService.createProcedure(createProcedureDto)
  }

  @Put('/:id')
  public async updateProcedure(@Param('id') id: string, @Body() updateProcedureDto: UpdateProcedureDto): Promise<ResponseProcedure> {

    return this.proceduresService.updateProcedure(id, updateProcedureDto)
  }

  @Delete('/:id')
  @HttpCode(204)
  public async deleteProcedure(@Param('id') id: string): Promise<void> {

    return this.proceduresService.deleteProcedure(id)
  }
}

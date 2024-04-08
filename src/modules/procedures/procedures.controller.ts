import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { AdminInterceptor } from '../auth/admin.interceptor';
import { AuthGuard } from '../auth/auth.guard';
import { CreateProcedureDto } from './dto/create-procedure.dto';
import { ResponseProcedure } from './dto/response-procedure.dto';
import { UpdateProcedureDto } from './dto/update-procedure.dto';
import { ProceduresService } from './procedures.service';

@UseGuards(AuthGuard)
@Controller('/procedures')
export class ProceduresController {
  constructor(private readonly proceduresService: ProceduresService) { }

  @Get('/:id')
  public async findProcedure(@Param('id') id: string): Promise<ResponseProcedure> {

    return this.proceduresService.findOneProcedure(id)
  }

  @Get()
  public async findAllProcedures(): Promise<ResponseProcedure[]> {

    return this.proceduresService.findAllProcedures();
  }

  @UseInterceptors(AdminInterceptor)
  @Post()
  public async createProcedure(@Body() createProcedureDto: CreateProcedureDto): Promise<ResponseProcedure> {

    return this.proceduresService.createProcedure(createProcedureDto)
  }

  @UseInterceptors(AdminInterceptor)
  @Put('/:id')
  public async updateProcedure(@Param('id') id: string, @Body() updateProcedureDto: UpdateProcedureDto): Promise<ResponseProcedure> {

    return this.proceduresService.updateProcedure(id, updateProcedureDto)
  }

  @UseInterceptors(AdminInterceptor)
  @Delete('/:id')
  @HttpCode(204)
  public async deleteProcedure(@Param('id') id: string): Promise<void> {

    return this.proceduresService.deleteProcedure(id)
  }
}

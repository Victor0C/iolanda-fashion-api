import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { AdminInterceptor } from '../auth/admin.interceptor';
import { AuthGuard } from '../auth/auth.guard';
import { CreateProcedureDto } from './dto/create-procedure.dto';
import { ResponseProcedure } from './dto/response-procedure.dto';
import { UpdateProcedureDto } from './dto/update-procedure.dto';
import { ProceduresService } from './procedures.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Procedures')
@UseGuards(AuthGuard)
@Controller('/procedures')
export class ProceduresController {
  constructor(private readonly proceduresService: ProceduresService) { }

  @ApiOperation({ summary: 'Get data from a procedure' })
  @ApiResponse({
      status:200,
      description:'Procedure data returned successfully',
      type: ResponseProcedure
  })
  @Get('/:id')
  public async findProcedure(@Param('id') id: string): Promise<ResponseProcedure> {

    return this.proceduresService.findOneProcedure(id)
  }

  @ApiOperation({ summary: 'Get data from all procedure' })
  @ApiResponse({
      status:200,
      description:'Procedures data returned successfully',
      type: [ResponseProcedure]
  })
  @Get()
  public async findAllProcedures(): Promise<ResponseProcedure[]> {

    return this.proceduresService.findAllProcedures();
  }

  @ApiOperation({ summary: 'Create a procedure' })
  @ApiResponse({
      status:200,
      description:'Procedure created successfully',
      type: ResponseProcedure
  })
  @ApiBody({type: CreateProcedureDto})
  @UseInterceptors(AdminInterceptor)
  @Post()
  public async createProcedure(@Body() createProcedureDto: CreateProcedureDto): Promise<ResponseProcedure> {

    return this.proceduresService.createProcedure(createProcedureDto)
  }

  @ApiOperation({ summary: 'Update a procedure' })
  @ApiResponse({
      status:200,
      description:'Procedure updated successfully',
      type: ResponseProcedure
  })
  @ApiBody({type: UpdateProcedureDto})
  @UseInterceptors(AdminInterceptor)
  @Put('/:id')
  public async updateProcedure(@Param('id') id: string, @Body() updateProcedureDto: UpdateProcedureDto): Promise<ResponseProcedure> {

    return this.proceduresService.updateProcedure(id, updateProcedureDto)
  }

  @ApiOperation({ summary: 'Delete a procedure' })
  @ApiResponse({
      status:204,
      description:'Procedure deleted successfully',
  })
  @UseInterceptors(AdminInterceptor)
  @Delete('/:id')
  @HttpCode(204)
  public async deleteProcedure(@Param('id') id: string): Promise<void> {

    return this.proceduresService.deleteProcedure(id)
  }
}

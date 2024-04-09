import { Body, Controller, Delete, Get, HttpCode, Param, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { AdminInterceptor } from '../auth/admin.interceptor';
import { AuthGuard } from '../auth/auth.guard';
import { CreateSaleDto } from './dto/create-sale.dto';
import { ResponseSale } from './dto/response-sale.dto';
import { SalesService } from './sales.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Sales')
@UseGuards(AuthGuard)
@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @ApiOperation({ summary: 'Get data from a sale' })
  @ApiResponse({
      status:200,
      description:'Sale data returned successfully',
      type: ResponseSale
  })
  @Get(':id')
  public async findOneSale(@Param('id') id: string): Promise<ResponseSale> {
    return this.salesService.findOneSale(id);
  }

  @ApiOperation({ summary: 'Get data from all sales' })
  @ApiResponse({
      status:200,
      description:'Sales data returned successfully',
      type: [ResponseSale]
  })
  @Get()
  public async findAllSales(): Promise<ResponseSale[]> {
    return this.salesService.findAllSales();
  }

  @ApiOperation({ summary: 'Create a sale' })
  @ApiResponse({
      status:200,
      description:'Sales created successfully',
      type: ResponseSale
  })
  @ApiBody({type: CreateSaleDto})
  @Post()
  public async createSale(@Body() createSaleDto: CreateSaleDto): Promise<ResponseSale>{
    return this.salesService.createSale(createSaleDto)
  }

  @ApiOperation({ summary: 'Deleted a sale' })
  @ApiResponse({
      status:200,
      description:'Sales deleted successfully',
  })
  @UseInterceptors(AdminInterceptor)
  @Delete(':id')
  @HttpCode(204)
  public async deleteSale(@Param('id') id: string): Promise<void> {
    return this.salesService.deleteSale(id);
  }
}

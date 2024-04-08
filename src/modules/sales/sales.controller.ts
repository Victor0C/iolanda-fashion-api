import { Body, Controller, Delete, Get, HttpCode, Param, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { AdminInterceptor } from '../auth/admin.interceptor';
import { AuthGuard } from '../auth/auth.guard';
import { CreateSaleDto } from './dto/create-sale.dto';
import { ResponseSale } from './dto/response-sale.dto';
import { SalesService } from './sales.service';

@UseGuards(AuthGuard)
@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Get(':id')
  public async findOneSale(@Param('id') id: string): Promise<ResponseSale> {
    return this.salesService.findOneSale(id);
  }

  @Get()
  public async findAllSales(): Promise<ResponseSale[]> {
    return this.salesService.findAllSales();
  }

  @Post()
  public async createSale(@Body() createSaleDto: CreateSaleDto): Promise<ResponseSale>{
    return this.salesService.createSale(createSaleDto)
  }

  @UseInterceptors(AdminInterceptor)
  @Delete(':id')
  @HttpCode(204)
  public async deleteSale(@Param('id') id: string): Promise<void> {
    return this.salesService.deleteSale(id);
  }
}

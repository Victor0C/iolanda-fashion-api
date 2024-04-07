import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { ResponseSale } from './dto/response-sale.dto';
import { SalesService } from './sales.service';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) { }

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

  @Delete(':id')
  public async deleteSale(@Param('id') id: string): Promise<void> {
    return this.salesService.deleteSale(id);
  }
}

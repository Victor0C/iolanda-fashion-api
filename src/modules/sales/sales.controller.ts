import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { SalesService } from './sales.service';
import { ResponseSale } from './dto/response-sale.dto';

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
  public async createSale(@Body() createSaleDto: CreateSaleDto)/*: Promise<ResponseSale>*/ {

    return this.salesService.createSale(createSaleDto)
  }

  @Put(':id')
  public async updateSale(@Param('id') id: string, @Body() updateSaleDto: UpdateSaleDto): Promise<ResponseSale> {
    return this.salesService.updateSale(id, updateSaleDto)
  }

  @Delete(':id')
  public async deleteSale(@Param('id') id: string): Promise<void> {
    return this.salesService.deleteSale(id);
  }
}

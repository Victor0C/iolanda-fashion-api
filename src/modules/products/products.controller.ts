import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';
import { ResponseProduct } from './dto/response-product';

@Controller('/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('/:id')
  public async findOneProduct(@Param('id') id: string): Promise<ResponseProduct> {
    return this.productsService.findOneProduct(id)
  }

  @Get()
  public async findAllProducts(): Promise<ResponseProduct[]> {
    return this.productsService.findAllProducts()
  }

  @Post()
  public async createProduct(@Body() createProductDto: CreateProductDto): Promise<ResponseProduct> {
    return this.productsService.createProduct(createProductDto)
  }

  @Put('/:id')
  public async updateProduct(@Param('id') id: string, @Body() updateProductData: UpdateProductDto): Promise<ResponseProduct> {
    return this.productsService.updateProduct(id, updateProductData)
  }

  @Delete('/:id')
  @HttpCode(204)
  public async deleteProduct(@Param('id') id: string): Promise<void> {
    return this.productsService.deleteProduct(id)
  }
}
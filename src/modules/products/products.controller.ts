import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { AdminInterceptor } from '../auth/admin.interceptor';
import { AuthGuard } from '../auth/auth.guard';
import { CreateProductDto } from './dto/create-product.dto';
import { ResponseProduct } from './dto/response-product';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';

@UseGuards(AuthGuard)
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

  @UseInterceptors(AdminInterceptor)
  @Post()
  public async createProduct(@Body() createProductDto: CreateProductDto): Promise<ResponseProduct> {
    return this.productsService.createProduct(createProductDto)
  }

  @UseInterceptors(AdminInterceptor)
  @Put('/:id')
  public async updateProduct(@Param('id') id: string, @Body() updateProductData: UpdateProductDto): Promise<ResponseProduct> {
    return this.productsService.updateProduct(id, updateProductData)
  }

  @UseInterceptors(AdminInterceptor)
  @Delete('/:id')
  @HttpCode(204)
  public async deleteProduct(@Param('id') id: string): Promise<void> {
    return this.productsService.deleteProduct(id)
  }
}
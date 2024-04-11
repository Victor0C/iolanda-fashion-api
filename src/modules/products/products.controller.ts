import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AdminInterceptor } from '../auth/admin.interceptor';
import { AuthGuard } from '../auth/auth.guard';
import { CreateProductDto } from './dto/create-product.dto';
import { ResponseProduct } from './dto/response-product';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';

@ApiBearerAuth()
@ApiTags('Products')
@UseGuards(AuthGuard)
@Controller('/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiOperation({ summary: 'Get data from a product' })
  @ApiResponse({
    status: 200,
    description: 'Product data returned successfully',
    type: ResponseProduct,
  })
  @Get('/:id')
  public async findOneProduct(
    @Param('id') id: string,
  ): Promise<ResponseProduct> {
    return this.productsService.findOneProduct(id);
  }

  @ApiOperation({ summary: 'Get data from all product' })
  @ApiResponse({
    status: 200,
    description: 'Products data returned successfully',
    type: [ResponseProduct],
  })
  @Get()
  public async findAllProducts(): Promise<ResponseProduct[]> {
    return this.productsService.findAllProducts();
  }

  @ApiOperation({ summary: 'Create a product' })
  @ApiResponse({
    status: 200,
    description: 'Product created successfully',
    type: ResponseProduct,
  })
  @ApiBody({ type: CreateProductDto })
  @UseInterceptors(AdminInterceptor)
  @Post()
  public async createProduct(
    @Body() createProductDto: CreateProductDto,
  ): Promise<ResponseProduct> {
    return this.productsService.createProduct(createProductDto);
  }

  @ApiOperation({ summary: 'Update a product' })
  @ApiResponse({
    status: 200,
    description: 'Product updated successfully',
    type: [ResponseProduct],
  })
  @ApiBody({ type: UpdateProductDto })
  @UseInterceptors(AdminInterceptor)
  @Put('/:id')
  public async updateProduct(
    @Param('id') id: string,
    @Body() updateProductData: UpdateProductDto,
  ): Promise<ResponseProduct> {
    return this.productsService.updateProduct(id, updateProductData);
  }

  @ApiOperation({ summary: 'Delete a product' })
  @ApiResponse({
    status: 204,
    description: 'Product deleted successfully',
  })
  @UseInterceptors(AdminInterceptor)
  @Delete('/:id')
  @HttpCode(204)
  public async deleteProduct(@Param('id') id: string): Promise<void> {
    return this.productsService.deleteProduct(id);
  }
}

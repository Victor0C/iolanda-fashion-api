import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';
import { ResponseProduct } from './dto/response-product';

@Injectable()
export class ProductsService {
  constructor(@InjectRepository(ProductEntity) private readonly productRepository: Repository<ProductEntity>) { }

  public async findProduct(id: string): Promise<ResponseProduct> {
    const product = await this.productRepository.findOneBy({ id })

    if (!product) throw new NotFoundException('Product not found')

    return new ResponseProduct(product)
  }

  public async findAllProducts(): Promise<ResponseProduct[]> {
    const dataProducts = await this.productRepository.find()

    const products = dataProducts.map((product) => new ResponseProduct(product))

    return products
  }

  public async createProduct(newProductData: CreateProductDto): Promise<ResponseProduct> {
    const productEntity = new ProductEntity()

    Object.assign(productEntity, newProductData as ProductEntity)

    const newProduct = await this.productRepository.save(productEntity)

    return new ResponseProduct(newProduct)
  }

  public async updateProduct(id: string, newProductData: UpdateProductDto): Promise<ResponseProduct> {
    const product = await this.findProduct(id)

    Object.assign(product, newProductData as ProductEntity)

    const updatedProduct = await this.productRepository.save(product)

    return new ResponseProduct(updatedProduct)
  }

  public async deleteProduct(id: string): Promise<void> {
    await this.findProduct(id)
    await this.productRepository.delete(id)
  }
}

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

  public async productServiceAllData(id: string): Promise<ProductEntity> {
    const product = await this.productRepository.findOneBy({ id })

    if (!product) throw new NotFoundException('Product not found')

    return product
  }

  public async findProduct(id: string): Promise<ResponseProduct> {
    const product = await this.productServiceAllData(id)

    return new ResponseProduct(product)
  }

  public async findAllProducts(): Promise<ResponseProduct[]> {
    const dataProducts = await this.productRepository.find()

    const products = dataProducts.map((product) => new ResponseProduct(product))

    return products
  }

  public async createProduct(createProductDTO: CreateProductDto): Promise<ResponseProduct> {
    const productEntity = new ProductEntity()

    Object.assign(productEntity, createProductDTO as ProductEntity)
    productEntity.price = productEntity.price * 100

    const newProduct = await this.productRepository.save(productEntity)

    return new ResponseProduct(newProduct)
  }

  public async updateProduct(id: string, updateProductDTO: UpdateProductDto): Promise<ResponseProduct> {
    const product = await this.findProduct(id)

    updateProductDTO.price = updateProductDTO.price * 100
    Object.assign(product, updateProductDTO as ProductEntity)

    const updatedProduct = await this.productRepository.save(product)

    return new ResponseProduct(updatedProduct)
  }

  public async deleteProduct(id: string): Promise<void> {
    await this.findProduct(id)
    await this.productRepository.delete(id)
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { ResponseProduct } from './dto/response-product';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(@InjectRepository(ProductEntity) private readonly productRepository: Repository<ProductEntity>) { }

  public async findProductAllData(id: string): Promise<ProductEntity> {
    const product = await this.productRepository.findOne({where: { id }})

    if (!product) throw new NotFoundException(`Product not found (id: ${id})`)

    return product
  }

  public async findOneProduct(id: string): Promise<ResponseProduct> {
    const product = await this.findProductAllData(id)

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
    const product = await this.findProductAllData(id)
  
    if(updateProductDTO.price) updateProductDTO.price = updateProductDTO.price * 100

    Object.assign(product, updateProductDTO as ProductEntity)
   

    const updatedProduct = await this.productRepository.save(product)

    return new ResponseProduct(updatedProduct)
  }

  public async deleteProduct(id: string): Promise<void> {
    await this.findOneProduct(id)
    await this.productRepository.delete(id)
  }
}

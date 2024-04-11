import { ApiProperty } from '@nestjs/swagger';
import { ProductEntity } from '../entities/product.entity';

export class ResponseProduct {
  constructor(product: ProductEntity) {
    delete product.deletedAT;

    return product;
  }

  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  price: number;

  @ApiProperty()
  createdAT: string;

  @ApiProperty()
  updatedAT: string;
}

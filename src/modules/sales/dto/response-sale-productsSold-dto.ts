import { ApiProperty } from '@nestjs/swagger';
import { ProductsSoldEntity } from '../entities/productsSold.entity';

export class ResponseProducstSoldForSales {
  constructor(productSold: ProductsSoldEntity) {
    delete productSold.product;

    return productSold;
  }

  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  price: number;
}

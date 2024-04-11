import { ApiProperty } from '@nestjs/swagger';
import { AddressEntity } from '../entities/address.entity';

export class ResponseAddress {
  constructor(address: AddressEntity) {
    delete address.id;
    delete address.deletedAT;

    return address;
  }

  @ApiProperty()
  cep: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  state: string;

  @ApiProperty()
  road: string;

  @ApiProperty()
  neighborhood: string;

  @ApiProperty()
  number: number;

  @ApiProperty()
  complement: string;

  @ApiProperty()
  createdAT: string;

  @ApiProperty()
  updatedAT: string;
}

import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateCustomerDto } from './create-customer.dto';
import { UpdateAddressDTO } from './update-addres.dto';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateCustomerDto extends PartialType(OmitType(CreateCustomerDto,['address'] as const)) {
    @ValidateNested()
    @Type(() => UpdateAddressDTO)
    address: UpdateAddressDTO
}

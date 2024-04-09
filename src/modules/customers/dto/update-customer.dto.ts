import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { CreateCustomerDto } from './create-customer.dto';
import { UpdateAddressDTO } from './update-addres.dto';

export class UpdateCustomerDto extends PartialType(OmitType(CreateCustomerDto,['address'] as const)) {

    @ApiProperty({required: false})
    @ValidateNested()
    @Type(() => UpdateAddressDTO)
    address: UpdateAddressDTO
}

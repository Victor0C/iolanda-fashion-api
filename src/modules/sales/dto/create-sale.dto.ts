import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { CreateProceduresPerformedDTO } from './create-procedurePerformed.dto';
import { CreateProductsSoldDTO } from './create-productsSold.dto';

export class CreateSaleDto {
  @ApiProperty()
  @IsUUID()
  @IsString()
  @IsNotEmpty({ message: 'the id_customer field cannot be empty' })
  id_customer: string;

  @ApiProperty({
    type: CreateProceduresPerformedDTO,
    isArray: true,
    required: false,
  })
  @ValidateNested()
  @Type(() => CreateProceduresPerformedDTO)
  @ArrayMinSize(1)
  @IsArray()
  @IsOptional()
  proceduresPerformed: CreateProceduresPerformedDTO[];

  @ApiProperty({
    type: CreateProductsSoldDTO,
    isArray: true,
    required: false,
  })
  @ValidateNested()
  @Type(() => CreateProductsSoldDTO)
  @ArrayMinSize(1)
  @IsArray()
  @IsOptional()
  productsSold: CreateProductsSoldDTO[];
}

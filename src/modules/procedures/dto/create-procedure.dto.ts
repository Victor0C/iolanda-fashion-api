import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProcedureDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'the name field cannot be empty' })
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'the description field cannot be empty' })
  description: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty({ message: 'the price field cannot be empty' })
  price: number;
}

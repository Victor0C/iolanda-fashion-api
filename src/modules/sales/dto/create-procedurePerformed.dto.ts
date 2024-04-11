import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUUID, Min } from 'class-validator';

export class CreateProceduresPerformedDTO {
  @ApiProperty()
  @IsUUID()
  @IsString()
  @IsNotEmpty({ message: 'the id field cannot be empty' })
  id: string;

  @ApiProperty()
  @Min(1, { message: 'the amount of a productSold must be at least 1' })
  @IsNumber()
  @IsNotEmpty({ message: 'the amount field cannot be empty' })
  amount: number;
}

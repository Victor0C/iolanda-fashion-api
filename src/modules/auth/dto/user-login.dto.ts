import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AuthDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  userLogin: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../entities/users.entity';
import { TypesUser } from '../enums/typesUser.enum';

export class ResponseUser {
  constructor(user: UserEntity) {
    delete user.password;
    delete user.deletedAT;

    return user;
  }

  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  userLogin: string;

  @ApiProperty({ enum: TypesUser })
  type: TypesUser;

  @ApiProperty()
  createdAT: string;

  @ApiProperty()
  updatedAT: string;
}

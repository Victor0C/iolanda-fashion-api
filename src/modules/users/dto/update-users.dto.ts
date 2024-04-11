import { PartialType } from '@nestjs/swagger';
import { CreateUserDTO } from './create-users.dto';

export class UpdateUserDTO extends PartialType(CreateUserDTO) {}

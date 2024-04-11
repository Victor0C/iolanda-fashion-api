import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { HashPassWord } from 'src/utilities/pipes/hashPassWord.pipe';
import { AdminInterceptor } from '../auth/admin.interceptor';
import { AuthGuard } from '../auth/auth.guard';
import { CreateUserDTO } from './dto/create-users.dto';
import { ResponseUser } from './dto/response-user.dto';
import { UpdateUserDTO } from './dto/update-users.dto';
import { UsersService } from './users.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Users')
@UseGuards(AuthGuard)
@UseInterceptors(AdminInterceptor)
@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Get data from a user' })
  @ApiResponse({
    status: 200,
    description: 'User data returned successfully',
    type: ResponseUser,
  })
  @Get('/:id')
  public async findOneUser(@Param('id') id: string): Promise<ResponseUser> {
    return this.usersService.findOneUser(id);
  }

  @ApiOperation({ summary: 'Get data from all users' })
  @ApiResponse({
    status: 200,
    description: 'Users data returned successfully',
    type: [ResponseUser],
  })
  @Get()
  public async findAllUsers(): Promise<ResponseUser[]> {
    return this.usersService.findAllUsers();
  }

  @ApiOperation({ summary: 'Create a user' })
  @ApiResponse({
    status: 200,
    description: 'User created successfully',
    type: ResponseUser,
  })
  @ApiBody({ type: CreateUserDTO })
  @Post()
  public async createUser(
    @Body(HashPassWord) createUserDTO: CreateUserDTO,
  ): Promise<ResponseUser> {
    return this.usersService.createUser(createUserDTO);
  }

  @ApiOperation({ summary: 'Update a user' })
  @ApiResponse({
    status: 200,
    description: 'User updated successfully',
    type: ResponseUser,
  })
  @ApiBody({ type: UpdateUserDTO })
  @Put('/:id')
  public async updateUser(
    @Param('id') id: string,
    @Body(HashPassWord) updateUserDTO: UpdateUserDTO,
  ): Promise<ResponseUser> {
    return this.usersService.updateUser(id, updateUserDTO);
  }

  @ApiOperation({ summary: 'Delete a user' })
  @ApiResponse({
    status: 204,
    description: 'User deleted successfully',
  })
  @Delete('/:id')
  @HttpCode(204)
  public async deleteUser(@Param('id') id: string): Promise<void> {
    return this.usersService.deleteUser(id);
  }
}

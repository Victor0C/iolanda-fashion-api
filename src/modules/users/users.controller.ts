import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { HashPassWord } from 'src/utilities/pipes/hashPassWord.pipe';
import { AdminInterceptor } from '../auth/admin.interceptor';
import { AuthGuard } from '../auth/auth.guard';
import { CreateUserDTO } from './dto/create-users.dto';
import { ResponseUser } from './dto/response-user.dto';
import { UpdateUserDTO } from './dto/update-users.dto';
import { UsersService } from './users.service';

@UseGuards(AuthGuard)
@UseInterceptors(AdminInterceptor)
@Controller('/users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get('/:id')
    public async findOneUser(@Param('id') id: string): Promise<ResponseUser> {
        return this.usersService.findOneUser(id)
    }

    @Get()
    public async findAllUsers(): Promise<ResponseUser[]> {
        return this.usersService.findAllUsers()
    }

    @Post()
    public async createUser(
        @Body(HashPassWord) createUserDTO: CreateUserDTO): Promise<ResponseUser> {
            
        return this.usersService.createUser(createUserDTO)
    }

    @Put('/:id')
    public async updateUser(
        @Param('id') id: string, @Body(HashPassWord) updateUserDTO: UpdateUserDTO): Promise<ResponseUser> {

        return this.usersService.updateUser(id, updateUserDTO)
    }

    @Delete('/:id')
    @HttpCode(204)
    public async deleteUser(@Param('id') id: string): Promise<void> {
        return this.usersService.deleteUser(id)
    }
}

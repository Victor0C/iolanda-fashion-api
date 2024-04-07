import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-users.dto';
import { ResponseUser } from './dto/response-user.dto';
import { UpdateUserDTO } from './dto/update-users.dto';
import { UsersService } from './users.service';
import { HashPassWord } from 'src/utilities/pipes/hashPassWord.pipe';


@Controller('/users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get('/:id')
    public async findOneUser(@Param('id') id: string): Promise<ResponseUser> {
        return this.usersService.findUserAllData(id)
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

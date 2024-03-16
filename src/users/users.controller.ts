import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { UserDTO } from './dto/create-users.dto';
import { ResponseUser } from './dto/response-user.dto';
import { UpdateUserDTO } from './dto/update-users.dto';
import { UsersService } from './users.service';

@Controller('/users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get('/:id')
    public async findUser(@Param('id') id: string): Promise<ResponseUser> {

        return this.usersService.findUser(id)
    }

    @Get()
    public async findAllUsers(): Promise<ResponseUser[]> {

        return this.usersService.findAllUsers()
    }

    @Post()
    public async createUser(@Body() dataUser: UserDTO): Promise<ResponseUser> {

        return this.usersService.createUser(dataUser)
    }

    @Put('/:id')
    public async updateUser(@Param('id') id: string, @Body() newUserData: UpdateUserDTO): Promise<ResponseUser> {

        return this.usersService.updateUser(id, newUserData)
    }

    @Delete('/:id')
    @HttpCode(204)
    public async deleteUser(@Param('id') id: string): Promise<void> {

        return this.usersService.deleteUser(id)
    }
}

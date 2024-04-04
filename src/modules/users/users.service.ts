import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDTO } from './dto/create-users.dto';
import { ResponseUser } from './dto/response-user.dto';
import { UpdateUserDTO } from './dto/update-users.dto';
import { UserEntity } from './entities/users.entity';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) { }

    public async findUserAllData(id: string): Promise<UserEntity> {
        const user = await this.userRepository.findOneBy({ id })

        if (!user) throw new NotFoundException(`User not found (id: ${id})`)

        return user
    }
    public async findUser(id: string): Promise<ResponseUser> {
        const user = await this.findUserAllData(id)

        return new ResponseUser(user)
    }

    public async findAllUsers(): Promise<ResponseUser[]> {
        const dataUsers = await this.userRepository.find()

        const users = dataUsers.map((user) => new ResponseUser(user))

        return users
    }

    public async createUser(newUserData: UserDTO): Promise<ResponseUser> {
        const userEntity = new UserEntity()
        Object.assign(userEntity, newUserData as UserEntity)

        const newUser = await this.userRepository.save(userEntity)

        return new ResponseUser(newUser)
    }

    public async updateUser(id: string, newUserData: UpdateUserDTO): Promise<ResponseUser> {
        const user = await this.findUserAllData(id)
        Object.assign(user, newUserData as UserEntity)

        const updatedUser = await this.userRepository.save(user)

        return new ResponseUser(updatedUser)
    }

    public async deleteUser(id: string): Promise<void> {
        await this.findUserAllData(id)
        await this.userRepository.delete(id)
    }
}

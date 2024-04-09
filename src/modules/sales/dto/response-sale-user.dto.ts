import { ApiProperty } from "@nestjs/swagger";
import { UserEntity } from "src/modules/users/entities/users.entity";

export class ResponseUserForSale{
    constructor(user: UserEntity){
        delete user.type
        delete user.password
        delete user.createdAT
        delete user.updatedAT
        delete user.deletedAT

        return user
    }
    
    @ApiProperty()
    id: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    userLogin: string;
}
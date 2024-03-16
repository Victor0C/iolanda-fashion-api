import { IsEnum, IsNotEmpty, IsString, MinLength } from "class-validator";
import { TypeUser } from "../enums/typeUser.enum";

export class UserDTO {

    @IsNotEmpty({ message: 'the name field cannot be empty' })
    @IsString()
    name: string;

    @IsString()
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    @IsNotEmpty({ message: 'the password field cannot be empty' })
    password: string;

    @IsEnum(TypeUser)
    @IsNotEmpty({ message: 'the type field cannot be empty' })
    type: TypeUser;

}
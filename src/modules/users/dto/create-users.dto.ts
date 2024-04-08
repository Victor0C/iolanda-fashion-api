import { IsEnum, IsNotEmpty, IsString, MinLength } from "class-validator";
import { TypesUser } from "../enums/typesUser.enum";

export class CreateUserDTO {

    @IsNotEmpty({ message: 'the name field cannot be empty' })
    @IsString()
    name: string;

    @IsNotEmpty({ message: 'the userLogin field cannot be empty' })
    @IsString()
    userLogin: string

    @IsString()
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    @IsNotEmpty({ message: 'the password field cannot be empty' })
    password: string;

    @IsEnum(TypesUser)
    @IsNotEmpty({ message: 'the type field cannot be empty' })
    type: TypesUser;

}
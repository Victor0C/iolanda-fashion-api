import { IsEnum, IsNotEmpty, IsString, MinLength } from "class-validator";
import { TypesUser } from "../enums/typesUser.enum";
import { ApiProperty } from "@nestjs/swagger";
import { UserLogin } from "../validation/userLogin.validator";

export class CreateUserDTO {

    @ApiProperty({required: true})
    @IsString()
    @IsNotEmpty({ message: 'the name field cannot be empty' })
    name: string;

    @ApiProperty({required: true})
    @UserLogin({message: 'userLogin is already being used'})
    @IsString()
    @IsNotEmpty({ message: 'the userLogin field cannot be empty' })
    userLogin: string

    @ApiProperty({required: true})
    @IsString()
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    @IsNotEmpty({ message: 'the password field cannot be empty' })
    password: string;

    @ApiProperty({required: true, enum: TypesUser})
    @IsEnum(TypesUser)
    @IsNotEmpty({ message: 'the type field cannot be empty' })
    type: TypesUser;

}
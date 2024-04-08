import { IsNotEmpty, IsString } from "class-validator"

export class AuthDTO {
    @IsString()
    @IsNotEmpty()
    userLogin: string

    @IsString()
    @IsNotEmpty()
    password: string
}


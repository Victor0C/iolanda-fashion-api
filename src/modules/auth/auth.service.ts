import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDTO } from './dto/user-login.dto';
import { UsersService } from '../users/users.service';
import * as bcrypt from "bcrypt"
import { JwtService } from '@nestjs/jwt';
import { JwtPayLoad } from 'src/modules/auth/Interfaces/payload-jwt.interface';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService, private readonly jwtService: JwtService){}

  public async login({userLogin, password}: AuthDTO) {
    const user = await this.userService.findUserLogin(userLogin)
    const auth = await bcrypt.compare(password, user.password)
  

    if(!auth){
      throw new UnauthorizedException('incorrect credentials')
    }

    const payload: JwtPayLoad = {
      sub: user.id,
      nameUser: user.name,
      type: user.type
    }

    return {
      acess_token: await this.jwtService.signAsync(payload)
    }
  }
}

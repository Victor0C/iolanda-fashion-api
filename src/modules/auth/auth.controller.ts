import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto/user-login.dto';
import { HashPassWord } from 'src/utilities/pipes/hashPassWord.pipe';


@Controller('login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  public async login(@Body() authDTO: AuthDTO) {
    return this.authService.login(authDTO)
  }
}

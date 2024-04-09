import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto/user-login.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseLogin } from './dto/response-user-login.dto';

@ApiTags('Session')
@Controller('login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Get the authentication token' })
  @ApiResponse({
    status:201,
    description:'User data returned successfully',
    type: ResponseLogin
  })
  @ApiBody({type: AuthDTO})
  @Post()
  public async login(@Body() authDTO: AuthDTO): Promise<ResponseLogin>  {
    return this.authService.login(authDTO)
  }
}

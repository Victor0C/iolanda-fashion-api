import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { JwtPayLoad } from './Interfaces/payload-jwt.interface';
import { RequestWithUser } from './Interfaces/request-with-user.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  private extractToken(request: Request): string | undefined {
    const [typeToken, token] = request.headers.authorization?.split(' ') ?? [];

    return typeToken === 'Bearer' ? token : undefined;
  }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const token = this.extractToken(request);

    if (!token) {
      throw new UnauthorizedException('Access denied');
    }

    try {
      const payload: JwtPayLoad = await this.jwtService.verifyAsync(token);
      request.user = payload;
    } catch (error) {
      throw new UnauthorizedException('Invalid JWT');
    }

    return true;
  }
}

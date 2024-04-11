import { JwtPayLoad } from './payload-jwt.interface';
import { Request } from 'express';

export interface RequestWithUser extends Request {
  user: JwtPayLoad;
}

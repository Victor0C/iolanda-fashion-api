import { CallHandler, ExecutionContext, Injectable, NestInterceptor, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { RequestWithUser } from './Interfaces/request-with-user.interface';
import { TypesUser } from 'src/modules/users/enums/typesUser.enum';

@Injectable()
export class AdminInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    
   const typeUser = context.switchToHttp().getRequest<RequestWithUser>().user.type

   if(typeUser !== TypesUser.ADMINISTRATOR){
    throw new UnauthorizedException('Access denied')
   }
    
    return next.handle();
  }
}

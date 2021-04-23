import { CanActivate, ExecutionContext, UnauthorizedException, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
  ) { }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const req = context.switchToHttp().getRequest();
      const authHeader = req.headers.authorization;
      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];

      if(bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException({
          message: 'You have to be authorized to do this action',
        });
      }

      req.user = this.jwtService.verify(token);

      return true;
    } catch (e) {
      throw new UnauthorizedException({
        message: 'You have to be authorized to do this action'
      });
    }
  }
}
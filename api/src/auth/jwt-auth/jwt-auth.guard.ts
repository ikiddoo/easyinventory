import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    console.log('Auth header:', authHeader);

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('No token provided');
    }

    const token = authHeader.substring(7);
    console.log('Extracted token:', token);
    
    try {
      const payload = this.parseJWT(token);
      console.log('Parsed payload:', payload);
      
      // add user info to request
      request.user = {
        id: payload.sub,
        username: payload.username
      };
      
      console.log('User set in request:', request.user);
      return true;
    } catch (error) {
      console.error('Token parsing error:', error);
      throw new UnauthorizedException('Invalid token');
    }
  }

  private parseJWT(token: string) {
    try {
      const base64Payload = token.split('.')[1];
      const payload = Buffer.from(base64Payload, 'base64').toString('ascii');
      return JSON.parse(payload);
    } catch (error) {
      throw new UnauthorizedException('Invalid token format');
    }
  }
}
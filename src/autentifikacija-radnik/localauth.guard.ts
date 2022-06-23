import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
 
@Injectable()
export class LocalAuthenticationGuardRadnik extends AuthGuard('radnik') {}
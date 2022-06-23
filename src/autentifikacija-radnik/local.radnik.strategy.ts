import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AutentifikacijaRadnikService } from './autentifikacija-radnik.service';
import { Radnik } from 'src/models/radnik';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy,'radnik') {
  constructor(private autenRadnikService: AutentifikacijaRadnikService) {
    super({
      usernameField: 'email',
      passwordField: 'lozinka',
    });
  }
  async validate(email: string, lozinka: string): Promise<Radnik> {
    return this.autenRadnikService.preuzmiAutentikovanogRadnika(email, lozinka);
  }
}
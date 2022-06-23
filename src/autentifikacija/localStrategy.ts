import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { Korisnik } from "src/models/korisnik";
import { AutenService } from "./auten/auten.service";




@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private autenService: AutenService) {
    super({
      usernameField: 'email'
    });
  }
  async validate(email: string, lozinka: string): Promise<Korisnik> {
    return this.autenService.preuzmiAutentikovanogKorisnika(email, lozinka);
  }
}
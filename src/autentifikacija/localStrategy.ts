import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { Korisnik } from "src/models/korisnik";
import { AutenService } from "./auten/auten.service";




@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private autenService: AutenService) {
    super({
      usernameField: 'email',
      passwordField: 'lozinka',
    });
  }
  async validate(email: string, lozinka: string): Promise<Korisnik> {
    console.log(email)
    console.log(lozinka);
    return this.autenService.preuzmiAutentikovanogKorisnika(email, lozinka);
  }
}
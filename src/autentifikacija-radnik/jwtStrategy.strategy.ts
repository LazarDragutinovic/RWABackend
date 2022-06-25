import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { RadnikServiceService } from "src/radnik/radnik-service/radnik-service.service";
import { Response,Request } from "express";
import { jwtConstants } from "src/constants";
import { TokenPayload } from "src/autentifikacija/tokenPayload";
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,'jwt-Radnik') {
  constructor(
    private readonly radnikService:RadnikServiceService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
        console.log(request.cookies.Authentication)
        return request?.cookies?.Authentication;
      }]),
      secretOrKey: jwtConstants.secretRadnik
    });
  }
 
  async validate(payload: TokenPayload) {
    return this.radnikService.preuzmiPrekoId(payload.userId);
  }
}
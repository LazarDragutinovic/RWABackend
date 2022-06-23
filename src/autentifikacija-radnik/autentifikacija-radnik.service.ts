import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RadnikDto } from 'src/dtos/radnik-dto';
import { RadnikServiceService } from 'src/radnik/radnik-service/radnik-service.service';
import * as bcrypt from "bcrypt"
import { TokenPayload } from 'src/autentifikacija/tokenPayload';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/constants';

enum PostgresErrorCode {
    UniqueViolation = '23505'
  }

@Injectable()
export class AutentifikacijaRadnikService {

    constructor(private readonly radnikService: RadnikServiceService,private readonly jwtService: JwtService) {}

    async registrujRadnika(radnikDto:RadnikDto){
        const hashedPassword = await bcrypt.hash(radnikDto.lozinka, 10);
        try {
        const createdUser = await this.radnikService.kreiraj({
            ...radnikDto,
            lozinka: hashedPassword
        });
        createdUser.lozinka = undefined;
        return createdUser;
        } catch (error) {
        if (error?.code === PostgresErrorCode.UniqueViolation) {
            throw new HttpException('Radnik s tim emailom vec postoji', HttpStatus.BAD_REQUEST);
        }
        throw new HttpException('Nesto je poslo po zlu.', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public JwtToken(radnikId: number) {
        const payload: TokenPayload = { userId:radnikId };
        const token = this.jwtService.sign(payload);
        return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${jwtConstants.expiration}`;
      }

    public async preuzmiAutentikovanogRadnika(email: string, hashedPassword: string) {
        try {
          const radnik = await this.radnikService.preuzmiPrekoEmaila(email);
          const isPasswordMatching = await bcrypt.compare(
            hashedPassword,
            radnik.lozinka
          );
          if (!isPasswordMatching) {
            throw new HttpException('Losa lozika', HttpStatus.BAD_REQUEST);
          }
          radnik.lozinka = undefined;
          return radnik;
        } catch (error) {
          throw new HttpException('Nesto je poslo po zlu.', HttpStatus.BAD_REQUEST);
        }
      }

    public preuzmiKolacicZaLogOut() {
        return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
    }
}

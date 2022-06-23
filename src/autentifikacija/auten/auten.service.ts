import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcrypt"
import { jwtConstants } from 'src/constants';
import { KorisnikDto } from 'src/dtos/korisnik.dto';
import { KorisnikService } from 'src/korisnik/korisnik/korisnik.service';
import { TokenPayload } from '../tokenPayload';

enum PostgresErrorCode {
    UniqueViolation = '23505'
  }

@Injectable()
export class AutenService {

    constructor(private readonly korisnikService: KorisnikService,private readonly jwtService: JwtService) {

    }

    public async registrujSe(korisnikDto: KorisnikDto) {
        const hashedPassword = await bcrypt.hash(korisnikDto.lozinka, 10);
        try {
          const korisnik = await this.korisnikService.kreirajKorisnika({
            ...korisnikDto,
            lozinka: hashedPassword
          });
          korisnik.lozinka = undefined;
          return korisnik;
        } catch (error) {
          if (error?.code === PostgresErrorCode.UniqueViolation) {
            throw new HttpException('Korisnik s tim emailom vec postoji.', HttpStatus.BAD_REQUEST);
          }
          throw new HttpException('Nesto je poslo po zlu.', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public async preuzmiAutentikovanogKorisnika(email: string, hashedPassword: string) {
        try {
          const korisnik = await this.korisnikService.preuzmiPrekoEmail(email);
          const isPasswordMatching = await bcrypt.compare(
            hashedPassword,
            korisnik.lozinka
          );
          if (!isPasswordMatching) {
            throw new HttpException('Pogresan email ili lozinka', HttpStatus.BAD_REQUEST);
          }
          korisnik.lozinka = undefined;
          return korisnik;
        } catch (error) {
          throw new HttpException('Pogresan email ili lozinka', HttpStatus.BAD_REQUEST);
        }
      }


    public KolacicSaJwtTokenon(korisnikId: number) {
        const TokenPayload: TokenPayload = {userId:korisnikId}
        
        const token= this.jwtService.sign(TokenPayload)
        return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${jwtConstants.expiration}`;
    }

    public kolacicZaLogOut() {
        return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
      }
}

import { Body, Controller, Get, HttpCode, Post, Req, Res, UseGuards } from '@nestjs/common';
import { RadnikDto } from 'src/dtos/radnik-dto';
import { Radnik } from 'src/models/radnik';
import { AutentifikacijaRadnikService } from './autentifikacija-radnik.service';
import { LocalAuthenticationGuardRadnik } from './localauth.guard';
import RequestSaRadnikom from './requestSaRadnikom';
import { Response } from 'express';
import JwtAuthenticationGuardRadnik from './jwtAuth.guard';

@Controller('autentifikacija-radnik')
export class AutentifikacijaRadnikController {

    constructor(
        private readonly autentRadnikService: AutentifikacijaRadnikService
      ) {}
     
      @Post('register')
      async registerujRadnika(@Body() radnikDto: RadnikDto) {
        return this.autentRadnikService.registrujRadnika(radnikDto);
      }
     
      @HttpCode(200)
      @UseGuards(LocalAuthenticationGuardRadnik)
      @Post('log-in')
      async logIn(@Req() request: RequestSaRadnikom, @Res() response: Response) {
        const radnik = <Radnik>request.user;
        let kolacic = this.autentRadnikService.JwtToken(radnik.id);
        response.setHeader("Set-Cookie",kolacic);
        radnik.lozinka = undefined;
        return response.send(radnik);
      }

      @UseGuards(JwtAuthenticationGuardRadnik)
      @Post('log-out')
      async logOut(@Req() request: RequestSaRadnikom, @Res() response: Response) {
        response.setHeader('Set-Cookie', this.autentRadnikService.preuzmiKolacicZaLogOut());
        return response.sendStatus(200);
      }

      @UseGuards(JwtAuthenticationGuardRadnik)
      @Get("Validiraj")
      authenticate(@Req() request: RequestSaRadnikom) {
        const radnik = <Radnik>request.user;
        radnik.lozinka = undefined;
        return radnik;
      }
}

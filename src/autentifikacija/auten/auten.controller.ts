import { Body, Controller, Get, HttpCode, HttpStatus, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { KorisnikDto } from 'src/dtos/korisnik.dto';
import { LocalAuthenticationGuard } from '../localauten.guards';
import RequestSaKorisnikom from '../requestSaKorisnikom';
import { AutenService } from './auten.service';
import { Response } from 'express';
import JwtAuthenticationGuard from '../jwtauth.guard';
import { Korisnik } from 'src/models/korisnik';
import { request } from 'http';
import { PromeniLozinkuParametri } from 'src/parametri/promeniLozinkuParametri';
@Controller('auten')
export class AutenController {
    constructor(private readonly autenService : AutenService) {

    }

    @Post('register')
    async register(@Body() korisnikDto: KorisnikDto) {
    return this.autenService.registrujSe(korisnikDto);
    }

    @HttpCode(200)
    @UseGuards(LocalAuthenticationGuard)
    @Post('log-in')
    async logIn(@Req() request: RequestSaKorisnikom,@Res() response: Response) {
        const korisnik = <Korisnik>request.user;
        
        const cookie = this.autenService.KolacicSaJwtTokenon(korisnik.id);
        response.setHeader('Set-Cookie', cookie)
        
        korisnik.lozinka = undefined;
        
        return response.send(korisnik);
    }

    @UseGuards(JwtAuthenticationGuard)
    @Post('log-out')
    async logOut(@Req() request: RequestSaKorisnikom, @Res() response: Response) {
        response.setHeader('Set-Cookie', this.autenService.kolacicZaLogOut());
        response.sendStatus(HttpStatus.OK);
        response.send({message:"uspesno izlogovan"})
        return response;
    }

    

    @UseGuards(JwtAuthenticationGuard)
    @Get()
    autentifikuj(@Req() req:RequestSaKorisnikom) {
        const korisnik = <Korisnik>req.user;
        korisnik.lozinka = undefined;
        return korisnik
    }
}

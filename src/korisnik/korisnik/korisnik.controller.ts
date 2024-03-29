import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import JwtAuthenticationGuardRadnik from 'src/autentifikacija-radnik/jwtAuth.guard';
import JwtAuthenticationGuard from 'src/autentifikacija/jwtauth.guard';
import { PromeniLozinkuParametri } from 'src/parametri/promeniLozinkuParametri';
import { KorisnikService } from './korisnik.service';

@Controller('korisnik')
export class KorisnikController {

    constructor(private korisnikService: KorisnikService){}

    @UseGuards(JwtAuthenticationGuard)
    @Put('izmeniLozinku')
    async izmeniLozinku(@Body() parametri: PromeniLozinkuParametri) {
        
        this.korisnikService.promeniLozinku(parametri)
        

        
    }

    @UseGuards(JwtAuthenticationGuardRadnik)
    @Get("PretraziKorisnike/:email")
    pretraziKorisnike(@Param() {email}) {

        return this.korisnikService.PretraziKorisnike(email);

    }
}

import { Controller, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import JwtAuthenticationGuardRadnik from 'src/autentifikacija-radnik/jwtAuth.guard';
import { PopravkaService } from './popravka.service';

@Controller('popravka')
export class PopravkaController {

    constructor(private popravkaService: PopravkaService){}

    @UseGuards(JwtAuthenticationGuardRadnik)
    @Get("PopravkeCentra/:id")
    preumiPopravkeCentra(@Param("id",ParseIntPipe) id: number) {
        return this.popravkaService.svePopravkeZaJedanCentar(id);
    }

    @UseGuards(JwtAuthenticationGuardRadnik)
    @Post("PriajviVoziloZaPopravku/:id")
    prijaviVoziloZaPopravku(@Param("id",ParseIntPipe) id: number) {
        return this.popravkaService.prijaviPopravku(id);
    }

    @UseGuards(JwtAuthenticationGuardRadnik)
    @Post("PreuzmiPopravku/:idm/:idp")
    PreuzmiPopravku(@Param("idm",ParseIntPipe) idm: number,@Param("idp",ParseIntPipe) idp: number ){
        return this.popravkaService.preuzmiPopravku(idm,idp);
    }

    @UseGuards(JwtAuthenticationGuardRadnik)
    @Post("ObaviPopravku/:id/:opis/:cena")
    obaviPopravku(@Param() podaci) {
        return this.popravkaService.obaviPopravku(podaci.id,podaci.opis,podaci.cena)
    }
}

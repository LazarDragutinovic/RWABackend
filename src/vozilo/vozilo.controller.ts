import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import JwtAuthenticationGuardRadnik from 'src/autentifikacija-radnik/jwtAuth.guard';
import JwtAuthenticationGuard from 'src/autentifikacija/jwtauth.guard';
import { VoziloDto } from 'src/dtos/vozilo.dto';
import { VoziloService } from './vozilo.service';

@Controller('vozilo')
export class VoziloController {


    constructor(private voziloService: VoziloService){}

    @Get("SvaVozila")
    preuzmiSvaVozila() {
        return this.voziloService.preuzmiSvaVozila();
    }

    @Get("Detaljno/:id")
    preuzmiDetalje(@Param("id",ParseIntPipe) id:number) {
        return this.voziloService.detaljno(id);
    }
    @UseGuards(JwtAuthenticationGuard)
    @Get("SvaVozilaKorisnika/:id")
    preuzmiSvaVozilaKorisnika(@Param("id",ParseIntPipe) id: number){
        return this.voziloService.svaVozilaKorisnika(id)
    }

    @Get("Pretraga/:proizvodjac/:grad")
    pretraga(@Param() params) {
        return this.voziloService.pretraziAutomobile(params.grad,params.proizvodjac,0);
    }

    @UseGuards(JwtAuthenticationGuardRadnik)
    @Get("PretragaBezGrada/:proizvodjac")
    pretragaBezGrada(@Param() params) {
        return this.voziloService.pretraziAutomobileBezGrada(params.proizvodjac);
    }

    @UseGuards(JwtAuthenticationGuardRadnik)
    @Get("PretragaSlobodna/:proizvodjac/:grad")
    pretragaSlobodna(@Param() params) {
        return this.voziloService.pretraziSlobodneAutomobile(params.grad,params.proizvodjac);
    }

    @UseGuards(JwtAuthenticationGuardRadnik)
    @Post("Dodaj")
    dodajVozilo(@Body() voziloDto : VoziloDto){
        return this.voziloService.dodajVozilo(voziloDto);
    }
    
    @UseGuards(JwtAuthenticationGuardRadnik)
    @Delete("Obrisi/:id")
    obrisiVozilo(@Param("id",ParseIntPipe) id: number) {
        this.voziloService.obrisiVozilo(id)
    }
    
}

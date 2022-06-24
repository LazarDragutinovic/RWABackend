import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import JwtAuthenticationGuardRadnik from 'src/autentifikacija-radnik/jwtAuth.guard';
import JwtAuthenticationGuard from 'src/autentifikacija/jwtauth.guard';
import { IznajmljivanjeDto } from 'src/dtos/iznajmljivanje.dto';
import { IznajmljivanjeService } from './iznajmljivanje.service';

@Controller('iznajmljivanje')
export class IznajmljivanjeController {

    constructor(private iznajmljivanjeServic: IznajmljivanjeService) {}

    @UseGuards(JwtAuthenticationGuard)
    @Get("preuzmiIznajmljivanjaKorisnikaKorisnik/:id")
    preuzmiIznajmljivanjaKorisnik(@Param("id",ParseIntPipe) id: number){
        return this.iznajmljivanjeServic.preuzmiIznajmljivanjaKorisnika(id);
    }

    @UseGuards(JwtAuthenticationGuardRadnik)
    @Get("preuzmiIznajmljivanjaKorisnikaRadnik/:id")
    preuzmiIznajmljivanjaRadnik(@Param("id",ParseIntPipe) id: number){
        return this.iznajmljivanjeServic.preuzmiIznajmljivanjaKorisnika(id);
    }

    @UseGuards(JwtAuthenticationGuardRadnik)
    @Post("Dodaj")
    dodaj(@Body() iznajmljivanjeDto: IznajmljivanjeDto) {
        return this.iznajmljivanjeServic.dodajIznajmljivanje(iznajmljivanjeDto);
    }

    @UseGuards(JwtAuthenticationGuardRadnik)
    @Put("Izmeni")
    izmeni(@Body() iznajmljivanjeDto: IznajmljivanjeDto) {
        return this.iznajmljivanjeServic.updateIznajmljivanje(iznajmljivanjeDto);
    }   
    
    @UseGuards(JwtAuthenticationGuardRadnik)
    @Delete("Izbrisi/:id")
    izbrisi(@Param("id",ParseIntPipe) id: number) {
         this.iznajmljivanjeServic.izbirisIznajmljivanje(id);
    }  


    @UseGuards(JwtAuthenticationGuardRadnik)
    @Put("Zavrsi/:id")
    zavrsi(@Param("id",ParseIntPipe) id: number) {
         this.iznajmljivanjeServic.izbirisIznajmljivanje(id);
    }  


}

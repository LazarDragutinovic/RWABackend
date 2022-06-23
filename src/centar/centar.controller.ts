import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import JwtAuthenticationGuardRadnik from 'src/autentifikacija-radnik/jwtAuth.guard';
import { CentarDto } from 'src/dtos/centar.dto';
import { Centar } from 'src/models/centar';
import { CentarService } from './centar.service';

@Controller('centar')
export class CentarController {

    constructor(private centarService: CentarService) {}

    @Get("SviCentri")
    preuzmiCentre() {
        return this.centarService.preuzmiCentre();
    }
    @UseGuards(JwtAuthenticationGuardRadnik)
    @Post("DodajCentar")
    dodajCentar(@Body() centarDto: CentarDto) {
        return this.centarService.dodajCentar(centarDto);
    }

    @UseGuards(JwtAuthenticationGuardRadnik)
    @Put("IzmeniCentar")
    izmeniCentar(@Body() centarDto: CentarDto) {
        return this.centarService.izmeniCentar(centarDto);
    }
    @UseGuards(JwtAuthenticationGuardRadnik)
    @Delete("IzbrisiCentar/:id")
    izbrisiCentar(@Param("id", ParseIntPipe) id: number) {
        return this.centarService.obrisiCentar(id);
    }
    


}
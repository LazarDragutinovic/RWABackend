import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import JwtAuthenticationGuardRadnik from 'src/autentifikacija-radnik/jwtAuth.guard';
import { RadnikDto } from 'src/dtos/radnik-dto';
import { RadnikServiceService } from '../radnik-service/radnik-service.service';

@Controller('radnik')
export class RadnikControllerController {
    constructor(private radnikService: RadnikServiceService) {

    }
    @UseGuards(JwtAuthenticationGuardRadnik)
    @Get()
    public radnici() {
        return this.radnikService.getRadnici()
    }
    @UseGuards(JwtAuthenticationGuardRadnik)
    @Get(":id")
    public getRadnik(@Param("id", ParseIntPipe) id: number){
        console.log(id)
        return this.radnikService.getRadnikById(id);
    }
    @UseGuards(JwtAuthenticationGuardRadnik)
    @Post("Dodaj")
    async postRadnik(@Body() radnik: RadnikDto) {
        
        return await this.radnikService.addRadnik(radnik);
    }
    @UseGuards(JwtAuthenticationGuardRadnik)
    @Get("pretrazi/:email")
    pretraziRadnike(@Param() {email}){
        return this.radnikService.pretraziRadnike(email);
    }

    @UseGuards(JwtAuthenticationGuardRadnik)
    @Put("PromeniPoziciju/:id/:pozicija")
    promeniPoziciju(@Param(){id,pozicija}){
        this.radnikService.postaviPoziciju(id,pozicija)
    }
}

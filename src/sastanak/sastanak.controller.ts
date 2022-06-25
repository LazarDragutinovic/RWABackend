import { Controller, Delete, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import JwtAuthenticationGuardRadnik from 'src/autentifikacija-radnik/jwtAuth.guard';
import { SastanakService } from './sastanak.service';

@Controller('sastanak')
export class SastanakController {
    constructor(private sastanakService: SastanakService){}

    @UseGuards(JwtAuthenticationGuardRadnik)
    @Post("KreirajSastanaj/:idr/:tema/:mesto/:vreme")
    kreirajSastanak(@Param() {idr, tema,mesto,vreme}){
        return this.sastanakService.kreirajSastanak(idr,tema,mesto,vreme);
    }

    @UseGuards(JwtAuthenticationGuardRadnik)
    @Put("Ok/:id")
    oksastanak(@Param("id",ParseIntPipe) id: number) {
        this.sastanakService.sastanakOk(id);
    }

    @UseGuards(JwtAuthenticationGuardRadnik)
    @Put("Odlozen/:id")
    odlozensastanak(@Param("id",ParseIntPipe) id: number) {
        this.sastanakService.odloziSastanak(id);
    }

    @UseGuards(JwtAuthenticationGuardRadnik)
    @Put("Otkazi/:id")
    otkazisastanak(@Param("id",ParseIntPipe) id: number) {
        this.sastanakService.otkaziSastanak(id);
    }


    @UseGuards(JwtAuthenticationGuardRadnik)
    @Post("PoziviRadnika/:idr/:ids")
    pozoviRadnika(@Param("idr",ParseIntPipe) idr: number, @Param("ids",ParseIntPipe) ids: number) {
        this.sastanakService.PozoviRadnika(idr,ids);
    }

    @UseGuards(JwtAuthenticationGuardRadnik)
    @Delete("OpozoviRadnika/:idr/:ids")
    opozoviRadnika(@Param("idr",ParseIntPipe) idr: number, @Param("ids",ParseIntPipe) ids: number) {
        this.opozoviRadnika(idr,ids);
    }

}

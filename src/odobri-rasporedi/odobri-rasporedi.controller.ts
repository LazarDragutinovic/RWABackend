import { Controller, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import JwtAuthenticationGuardRadnik from 'src/autentifikacija-radnik/jwtAuth.guard';
import { OdobriRasporediService } from './odobri-rasporedi.service';

@Controller('odobri-rasporedi')
export class OdobriRasporediController {

    constructor(private odobriRaseporediService: OdobriRasporediService){}

    @UseGuards(JwtAuthenticationGuardRadnik)
    @Put("OdobriNalog/:id")
    odobriNalog(@Param("id",ParseIntPipe) id: number) {
        return this.odobriRaseporediService.OdobriNalog(id); 
    }

    @UseGuards(JwtAuthenticationGuardRadnik)
    @Post("Rasporedi/:idr/:idc")
    rasporedi(@Param("idr",ParseIntPipe) idr: number, @Param("idc",ParseIntPipe) idc:number) {
        return this.odobriRaseporediService.rasporedi(idr, idc);
    }

}

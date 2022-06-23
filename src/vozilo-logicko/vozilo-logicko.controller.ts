import { Body, Controller, Delete, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import JwtAuthenticationGuardRadnik from 'src/autentifikacija-radnik/jwtAuth.guard';
import { VoziloLogickoDto } from 'src/dtos/voziloLogicko.dto';
import { VoziloLogickoService } from './vozilo-logicko.service';

@Controller('vozilo-logicko')
export class VoziloLogickoController {

    constructor(private voziloLogickoService: VoziloLogickoService) {

    }

    @UseGuards(JwtAuthenticationGuardRadnik)
    @Post("Dodaj")
    dodajVozilo(@Body() voziloLogickoDto: VoziloLogickoDto) {
        return this.voziloLogickoService.dodajVoziloLogicko(voziloLogickoDto)
    }

    @UseGuards(JwtAuthenticationGuardRadnik)
    @Delete("Izbrisi/:id")
    izbrisiVozilo(@Param("id",ParseIntPipe) id: number) {
        this.voziloLogickoService.obrisiVoziloLogicko(id);
    }
}

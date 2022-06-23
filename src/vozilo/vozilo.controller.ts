import { Controller, Get } from '@nestjs/common';
import { VoziloService } from './vozilo.service';

@Controller('vozilo')
export class VoziloController {


    constructor(private voziloService: VoziloService){}

    @Get("SvaVozila")
    preuzmiSvaVozila() {
        return this.voziloService.preuzmiSvaVozila();
    }
}

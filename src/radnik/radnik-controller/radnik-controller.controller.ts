import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { RadnikDto } from 'src/dtos/radnik-dto';
import { RadnikServiceService } from '../radnik-service/radnik-service.service';

@Controller('radnik')
export class RadnikControllerController {
    constructor(private radnikService: RadnikServiceService) {

    }

    @Get()
    public radnici() {
        return this.radnikService.getRadnici()
    }

    @Get(":id")
    public getRadnik(@Param("id", ParseIntPipe) id: number){
        console.log(id)
        return this.radnikService.getRadnikById(id);
    }

    @Post("Dodaj")
    async postRadnik(@Body() radnik: RadnikDto) {
        
        return await this.radnikService.addRadnik(radnik);
    }
}

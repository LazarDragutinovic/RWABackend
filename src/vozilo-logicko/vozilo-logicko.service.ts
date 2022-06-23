import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VoziloLogickoDto } from 'src/dtos/voziloLogicko.dto';
import { VoziloLogicko } from 'src/models/voziloLogicko';
import { Repository } from 'typeorm';

@Injectable()
export class VoziloLogickoService {


    constructor(@InjectRepository(VoziloLogicko) private voziloLogickoRepository : Repository<VoziloLogicko>) {

    }

    async dodajVoziloLogicko(voziloLogickoDto: VoziloLogickoDto) {
        let vozilo = this.voziloLogickoRepository.create(voziloLogickoDto);
        vozilo = await this.voziloLogickoRepository.save(vozilo);
        return new VoziloLogickoDto(vozilo);
    }

    async obrisiVoziloLogicko(id: number) {
        let vozilo = await this.voziloLogickoRepository.findOne({where: {id}});
        if(vozilo === null) throw new HttpException("Nema tog vozila", HttpStatus.NOT_FOUND);

        await this.voziloLogickoRepository.delete(id);
    }
}

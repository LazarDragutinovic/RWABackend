import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Vozilo } from 'src/models/vozilo';
import { Repository } from 'typeorm';

@Injectable()
export class VoziloService {

    constructor(@InjectRepository(Vozilo)  private voziloRepository: Repository<Vozilo>) {}

    preuzmiSvaVozila() {
        return this.voziloRepository.find();
    }
}

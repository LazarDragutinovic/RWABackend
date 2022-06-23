import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RadnikDto } from 'src/dtos/radnik-dto';
import { Radnik } from 'src/models/radnik';
import { Repository } from 'typeorm';

@Injectable()
export class RadnikServiceService {

    constructor(@InjectRepository(Radnik) private radnikRepository : Repository<Radnik>){}

    getRadnici() {
        return this.radnikRepository.find();
    }

    getRadnikById(id: number) {
        return this.radnikRepository.findOneBy({id:id});
    }

    async addRadnik(radnikDto:RadnikDto) {
        console.log(radnikDto.pozicija)
        let radnik: Radnik = new Radnik();
        radnik.ime = radnikDto.ime;
        radnik.prezime = radnikDto.prezime;
        radnik.email = radnikDto.email;
        radnik.pozicija = radnikDto.pozicija;
        console.log(radnik.pozicija)
        radnik = await this.radnikRepository.save(radnik);

        return new RadnikDto(radnik);
    }
}

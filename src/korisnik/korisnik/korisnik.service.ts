import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { KorisnikDto } from 'src/dtos/korisnik.dto';
import { Korisnik } from 'src/models/korisnik';
import { Repository } from 'typeorm';

@Injectable()
export class KorisnikService {

    constructor(@InjectRepository(Korisnik) private korisnikRepository: Repository<Korisnik>){

    }

    async preuzmiPrekoEmail(email: string) {
        const korisnik = await this.korisnikRepository.findOne({ where: {email} });
        if (korisnik) {
        return korisnik;
        }
        throw new HttpException('Korisnik sa ovim e-mailom ne postoji', HttpStatus.NOT_FOUND);
    }


    async kreirajKorisnika(korisnikDto: KorisnikDto) {
        const noviKorisnik = await this.korisnikRepository.create(korisnikDto);
        await this.korisnikRepository.save(noviKorisnik);
        return new KorisnikDto(noviKorisnik);
    }
}

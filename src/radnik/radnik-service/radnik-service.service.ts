import { Body, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RadnikDto } from 'src/dtos/radnik-dto';
import { Pozicija, Radnik } from 'src/models/radnik';
import { Like, Repository } from 'typeorm';

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

    async preuzmiPrekoEmaila(email: string) {
        const radnik = await this.radnikRepository.findOne({where:{ email} });
        if (radnik) {
          return radnik;
        }
        throw new HttpException('User with this email does not exist', HttpStatus.NOT_FOUND);
      }
     
      async kreiraj(radnikDto: RadnikDto) {
        const noviRadnik = await this.radnikRepository.create(radnikDto);
        noviRadnik.odobren = false;
        noviRadnik.pozicija = Pozicija.MEHANICAR
        await this.radnikRepository.save(noviRadnik);
        return noviRadnik;
      }

    async preuzmiPrekoId(id: number) {
        let radnik = await this.radnikRepository.findOne({where: {id}})
        if (radnik) {
            return radnik;
        }
        throw new HttpException('Korisnik sa ovim idem ne postoji', HttpStatus.NOT_FOUND);
    }

     pretraziRadnike(email:string) {
        let radnici =  this.radnikRepository.find({where:{email: Like(`%${email}%`)}});
        
        return radnici
    }

    async postaviPoziciju(id: number, pozicija: string) {
        let radnik = await this.radnikRepository.findOne({where:{id}});
        radnik.pozicija = <Pozicija>pozicija
        await this.radnikRepository.save(radnik)
    }
}

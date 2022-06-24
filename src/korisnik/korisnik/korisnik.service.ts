import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { KorisnikDto } from 'src/dtos/korisnik.dto';
import { Korisnik } from 'src/models/korisnik';
import { PromeniLozinkuParametri } from 'src/parametri/promeniLozinkuParametri';
import { ILike, Repository } from 'typeorm';
import * as bcrypt from "bcrypt"
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

    async preuzmiPrekoId(id: number) {
        const korisnik = await this.korisnikRepository.findOne({ where:{id} });
        if (korisnik) {
          return korisnik;
        }
        throw new HttpException('Korisnik sa tim idem ne postoji.', HttpStatus.NOT_FOUND);
      }

    async promeniLozinku(promeniLozinkuParametri: PromeniLozinkuParametri) {
        const korisnik = await this.korisnikRepository.findOne({where: {email: promeniLozinkuParametri.email}});

        if(await bcrypt.compare(promeniLozinkuParametri.staraLozinka,korisnik.lozinka)) {
            korisnik.lozinka = await bcrypt.hash(promeniLozinkuParametri.novaLozinka,10);
            await this.korisnikRepository.save(korisnik);
        }
        else throw new HttpException("Netacna stara lozinka.",HttpStatus.UNAUTHORIZED)
    }

    async PretraziKorisnike(jmbg:number) {
        
        let korisnici = await this.korisnikRepository.createQueryBuilder("korisnik")
                        .where("korisnik.jmbg like :jmbg",{jmbg: `%${jmbg}%`})
                        .getMany();
        return korisnici;
    }
}

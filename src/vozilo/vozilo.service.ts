import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VoziloDto } from 'src/dtos/vozilo.dto';
import { Iznajmljivanje } from 'src/models/iznajmljivanje';
import { Korisnik } from 'src/models/korisnik';
import { Vozilo } from 'src/models/vozilo';
import { VoziloLogicko } from 'src/models/voziloLogicko';
import { Like, Repository } from 'typeorm';

@Injectable()
export class VoziloService {

    constructor(@InjectRepository(Vozilo)  private voziloRepository: Repository<Vozilo>,
                @InjectRepository(VoziloLogicko) private voziloLogickoRepository : Repository<VoziloLogicko>,
                @InjectRepository(Korisnik) private korisnikRepository: Repository<Korisnik>,
                @InjectRepository(Iznajmljivanje) private iznajmnjivanjeRepository: Repository<Iznajmljivanje>
                ) {}

    preuzmiSvaVozila() {
        return this.voziloRepository.find({relations:["voziloLogicko","slike","centar"]});
    }

    async pretraziAutomobile(grad: string, proizvodjac: string,strana: number) {
        
        let vozila = await this.voziloRepository.find({where:{voziloLogicko: {proizvodjac: Like(`%${proizvodjac.toUpperCase()}%`)} , centar: {grad:Like(`%${grad}%`)}},relations:["voziloLogicko","slike","centar"]});
        // let vozila1= await this.voziloLogickoRepository.createQueryBuilder("vozilo")
        //                         .where("vozilo.voziloLogicko.proizvodjac like :proizvodjac and vozilo.centar.grad like :grad", {proizvodjac: `%${proizvodjac}%`, grad: `%${grad}%`})
        //                         .getMany()
        
        return vozila;
    }

    async dodajVozilo(voziloDto: VoziloDto) {
        let vozilo = this.voziloRepository.create(voziloDto);
       
        let voziloLogicko = await this.voziloLogickoRepository.findOne({where: {id:voziloDto.idLogickogVozila}});
        vozilo.voziloLogicko =voziloLogicko;
        if(voziloLogicko === null) {
            throw new HttpException("Nema tog logickog vozila.", HttpStatus.NOT_FOUND);
        }

        vozilo = await this.voziloRepository.save(vozilo);
        vozilo.voziloLogicko = voziloLogicko;
        return new VoziloDto(vozilo);

    }

    async detaljno(id: number) {
        let vozilo = await this.voziloRepository.findOne({where:{id},relations: ["centar","slike","voziloLogicko"]});
        if(vozilo === null) throw new HttpException("Nema tog vozila",HttpStatus.NOT_FOUND);
        return vozilo;
    }

    async svaVozilaKorisnika(idKorisnik: number){
        let korisnik = await this.korisnikRepository.findOne({where:{id:idKorisnik},relations: ["iznajmljivanja"]}) 
        if(!korisnik) throw new HttpException("Nema tog korisnika.",HttpStatus.NOT_FOUND);

        let vozilaIds = [];
        for(let i = 0; i < korisnik.iznajmljivanja.length;i++) {
            let iznajmljivanje = await this.iznajmnjivanjeRepository.findOne({where:{id:korisnik.iznajmljivanja[i].id},relations:["vozilo"]})
            vozilaIds.push(iznajmljivanje.vozilo.id)
        }

        return vozilaIds;
    } 
}

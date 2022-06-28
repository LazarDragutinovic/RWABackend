import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IznajmljivanjeDto } from 'src/dtos/iznajmljivanje.dto';
import { Iznajmljivanje } from 'src/models/iznajmljivanje';
import { Korisnik } from 'src/models/korisnik';
import { Pozicija, Radnik } from 'src/models/radnik';
import { Vozilo } from 'src/models/vozilo';
import { Repository } from 'typeorm';

@Injectable()
export class IznajmljivanjeService {

    constructor(@InjectRepository(Iznajmljivanje) private iznajmljivanjeRepository: Repository<Iznajmljivanje>,
                @InjectRepository(Korisnik) private korisnikRepository: Repository<Korisnik>,
                @InjectRepository(Vozilo) private voziloRepository: Repository<Vozilo>,
                @InjectRepository(Radnik) private radnikRepository: Repository<Radnik>
    ){}

    async preuzmiIznajmljivanjaKorisnika(id: number) {
        console.log(id)
        let korisnik = await this.korisnikRepository.findOne({where:{id},relations:["iznajmljivanja"
                                                        ,"iznajmljivanja.korisnik",
                                                         "iznajmljivanja.vozilo",
                                                         "iznajmljivanja.sluzbenik"
                                                        ]});
        if(!korisnik) throw new HttpException("Nema tog korisnika",HttpStatus.NOT_FOUND);
        let iznajmljivanja = [];
        
        console.log(korisnik.iznajmljivanja.length)
        for(let i = 0 ; i < korisnik.iznajmljivanja.length;i++){
            let izn = korisnik.iznajmljivanja[i];
            let vozilo = await this.voziloRepository.findOne({where:{id:izn.vozilo.id},relations:["voziloLogicko"]})
            console.log(izn)
            iznajmljivanja.push({
                id: izn.id,
                datum: izn.datum,
                dana: izn.dana,
                zavrseno: izn.zavrseno,
                vozilo:vozilo.voziloLogicko.proizvodjac+" "+vozilo.voziloLogicko.model,
                cenaUkupna: vozilo.cenaPoDanu * izn.dana
            });
        }
        // korisnik.iznajmljivanja.forEach(async(izn)=>{
        //     //let vozilo = await this.voziloRepository.findOne({where:{id:izn.vozilo.id},relations:["voziloLogicko"]})
        //     iznajmljivanja.push({
        //         id: izn.id,
        //         datum: izn.datum,
        //         dana: izn.dana,
        //         zavrseno: izn.zavrseno,
        //         //vozilo:vozilo.voziloLogicko.proizvodjac+" "+vozilo.voziloLogicko.model
        //     });
        // })
        console.log(iznajmljivanja)
        return iznajmljivanja;
    }

    async dodajIznajmljivanje(iznajmljivanjeDto : IznajmljivanjeDto) {
        let iznajmljivanje = new Iznajmljivanje();
        let korisnik = await this.korisnikRepository.findOne({where: {id:iznajmljivanjeDto.korisnikId}});
        let sluzbenik = await this.radnikRepository.findOne({where: {id:iznajmljivanjeDto.sluzbenikId}});
        let vozilo = await this.voziloRepository.findOne({where: {id:iznajmljivanjeDto.voziloId},relations:["iznajmljivanja"]});
        if(!korisnik) throw new HttpException("Nema trazenog korisnika.",HttpStatus.NOT_FOUND);
        if(!sluzbenik) throw new HttpException("Nema trazenog sluzbenika.",HttpStatus.NOT_FOUND);
        if(!vozilo) throw new HttpException("Nema trazenog vozila.",HttpStatus.NOT_FOUND);
        if(sluzbenik.pozicija == Pozicija.MEHANICAR) throw new HttpException("Mehanicar ne moze da iznajmi vozilo.", HttpStatus.UNAUTHORIZED);

        vozilo.iznajmljivanja.forEach(iznm=>{
            if(iznm.zavrseno == false) throw new HttpException("Nemoze da se iznajmi vozilo koji nije vraceno.",HttpStatus.UNAUTHORIZED);
        })

        iznajmljivanje.dana = iznajmljivanjeDto.dana;
        iznajmljivanje.datum = iznajmljivanjeDto.datum;
        iznajmljivanje.korisnik = korisnik;
        iznajmljivanje.sluzbenik = sluzbenik;
        iznajmljivanje.vozilo =vozilo
        iznajmljivanje.zavrseno = false;


        iznajmljivanje = await this.iznajmljivanjeRepository.save(iznajmljivanje);

        return new IznajmljivanjeDto(iznajmljivanje);
        
    }

   

    async updateIznajmljivanje(iznajmljivanjeDto: IznajmljivanjeDto) {
        let iznajmljivanje = await this.iznajmljivanjeRepository.findOne({where:{id:iznajmljivanjeDto.id}});
        let korisnik = await this.korisnikRepository.findOne({where: {id:iznajmljivanjeDto.korisnikId}});
        let sluzbenik = await this.radnikRepository.findOne({where: {id:iznajmljivanjeDto.sluzbenikId}});
        let vozilo = await this.voziloRepository.findOne({where: {id:iznajmljivanjeDto.voziloId},relations:["iznajmljivanja"]});
        if(!korisnik) throw new HttpException("Nema trazenog korisnika.",HttpStatus.NOT_FOUND);
        if(!sluzbenik) throw new HttpException("Nema trazenog sluzbenika.",HttpStatus.NOT_FOUND);
        if(!vozilo) throw new HttpException("Nema trazenog vozila.",HttpStatus.NOT_FOUND);
        if(sluzbenik.pozicija == Pozicija.MEHANICAR) throw new HttpException("Mehanicar ne moze da iznajmi vozilo.", HttpStatus.UNAUTHORIZED);

        vozilo.iznajmljivanja.forEach(iznm=>{
            if(iznm.zavrseno == false) throw new HttpException("Nemoze da se iznajmi vozilo koji nije vraceno.",HttpStatus.UNAUTHORIZED);
        })

        iznajmljivanje.dana = iznajmljivanjeDto.dana;
        iznajmljivanje.datum = iznajmljivanjeDto.datum;
        iznajmljivanje.korisnik = korisnik;
        iznajmljivanje.sluzbenik = sluzbenik;
        iznajmljivanje.vozilo =vozilo
        iznajmljivanje.zavrseno = iznajmljivanjeDto.zavrseno;


        await this.iznajmljivanjeRepository.update(iznajmljivanje.id,iznajmljivanje);

        return new IznajmljivanjeDto(iznajmljivanje);        
    }

    async zavrsiIznajmljivanje(id: number) {
        let iznajmljivanje =await this.iznajmljivanjeRepository.findOne({where:{id},relations:["vozilo"]});

        if(!iznajmljivanje) throw new HttpException("Nema tog iznajmljivanja",HttpStatus.NOT_FOUND);
        let vozilo = await this.voziloRepository.findOne({where:{id:iznajmljivanje.vozilo.id},relations:["voziloLogicko"]});
        iznajmljivanje.zavrseno = true;
        this.iznajmljivanjeRepository.update(id,iznajmljivanje);
        let rezultat = {
            id: iznajmljivanje.id,
            dana: iznajmljivanje.dana,
            datum: iznajmljivanje.datum,
            zavrseno:iznajmljivanje.zavrseno,
            vozilo:vozilo.voziloLogicko.proizvodjac + " " + vozilo.voziloLogicko.model
        }

        return rezultat
    }

    async izbirisIznajmljivanje(id: number) {
        let iznajmljivanje =await this.iznajmljivanjeRepository.findOne({where:{id}});

        if(!iznajmljivanje) throw new HttpException("Nema tog iznajmljivanja",HttpStatus.NOT_FOUND);

        if(iznajmljivanje.zavrseno != true) throw new HttpException("Zavrsite iznajmljivanje",HttpStatus.NOT_FOUND);

        await this.iznajmljivanjeRepository.delete(id);
    }
}

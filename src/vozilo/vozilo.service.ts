import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VoziloDto } from 'src/dtos/vozilo.dto';
import { Iznajmljivanje } from 'src/models/iznajmljivanje';
import { Korisnik } from 'src/models/korisnik';
import { SlikaAutomobila } from 'src/models/slika-Automobila';
import { Vozilo } from 'src/models/vozilo';
import { VoziloLogicko } from 'src/models/voziloLogicko';
import { Repository } from 'typeorm';
import { Like as LikeV } from 'src/models/like';
import {Like } from "typeorm"
@Injectable()
export class VoziloService {

    constructor(@InjectRepository(Vozilo)  private voziloRepository: Repository<Vozilo>,
                @InjectRepository(VoziloLogicko) private voziloLogickoRepository : Repository<VoziloLogicko>,
                @InjectRepository(Korisnik) private korisnikRepository: Repository<Korisnik>,
                @InjectRepository(Iznajmljivanje) private iznajmnjivanjeRepository: Repository<Iznajmljivanje>,
                @InjectRepository(SlikaAutomobila) private slikeRepository: Repository<SlikaAutomobila>,
                @InjectRepository(LikeV) private likeRepository:Repository<LikeV>
                ) {}

    preuzmiSvaVozila() {
        return this.voziloRepository.find({relations:["voziloLogicko","slike","centar"]});
    }

    async pretraziAutomobile(grad: string, proizvodjac: string,strana: number) {
        if(grad == "1") grad = ""
              
        let vozila = await this.voziloRepository.find({relations:["voziloLogicko","slike","centar"]});
        let taVozila = [];
        vozila.forEach(v=>{
            
            if(v.voziloLogicko.proizvodjac.toLowerCase().includes(proizvodjac.toLowerCase()) && v.centar?.grad?.toLowerCase().includes(grad.toLowerCase()))
                taVozila.push(v);
        })
        
        return taVozila;
    }

    async pretraziAutomobileBezGrada(proizvodjac: string) {
        
        let vozila = await this.voziloRepository.find({relations:["voziloLogicko","slike","centar"]});
        // let vozila1= await this.voziloLogickoRepository.createQueryBuilder("vozilo")
        //                         .where("vozilo.voziloLogicko.proizvodjac like :proizvodjac and vozilo.centar.grad like :grad", {proizvodjac: `%${proizvodjac}%`, grad: `%${grad}%`})
        //                         .getMany()
        vozila = vozila.filter(v=>v.centar && v.voziloLogicko.proizvodjac.toLowerCase().includes(proizvodjac.toLowerCase()));
        return vozila;
    }

    async pretraziSlobodneAutomobile(grad: string,proizvodjac:string) {
        if(grad=="1") grad = ""
        let vozila = await this.voziloRepository.find({relations:["voziloLogicko","slike","centar","iznajmljivanja","popravke"]})
        let slobodna:Vozilo[] = []
        
        vozila.forEach(v=>{
            if(v.popravke.filter(p=>p.obavljena == false).length != 0) {}
            
            else if(v.iznajmljivanja.length ==0 && v.centar)
                if(v.voziloLogicko.proizvodjac.toLowerCase().includes(proizvodjac.toLowerCase()) && v.centar.grad.toLowerCase().includes(grad.toLowerCase())) slobodna.push(v)
            else {
                let slobodno = true;
                for(let i = 0; i< v.iznajmljivanja.length;i++){
                    if(!v.iznajmljivanja[i].zavrseno) {
                        slobodno = false;
                        break;
                    }
                }
                if(slobodno && v.voziloLogicko.proizvodjac.toLowerCase().includes(proizvodjac.toLowerCase()) && v.centar.grad.toLowerCase().includes(grad.toLowerCase())) slobodna.push(v)
            }
        })

        
        return slobodna
    }

    async dodajVozilo(voziloDto: VoziloDto) {
        let vozilo = this.voziloRepository.create(voziloDto);
       
       
        let voziloLogicko = await this.voziloLogickoRepository.findOne({where: {id:voziloDto.idLogickogVozila}});
        vozilo.voziloLogicko =voziloLogicko;
        if(voziloLogicko === null) {
            throw new HttpException("Nema tog logickog vozila.", HttpStatus.NOT_FOUND);
        }
        let voziloSaIstomOznakom = await this.voziloRepository.findOne({where:{registracionaOznaka:voziloDto.registracionaOznaka}})
        
        if(voziloSaIstomOznakom) throw new HttpException("Vec postoji sa istom oznakom",HttpStatus.UNAUTHORIZED);
        vozilo = await this.voziloRepository.save(vozilo);
        vozilo.voziloLogicko = voziloLogicko;
        let slika = this.slikeRepository.create(vozilo.slike[0]);
        slika.vozilo = vozilo
        slika = await this.slikeRepository.save(slika);
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

    async obrisiVozilo(id: number) {
        
        let vozilo = await this.voziloRepository.findOne({where:{id},relations:["slike","likes","iznajmljivanja"]})
        for(let i = 0; i < vozilo.slike.length;i++){
            await this.slikeRepository.delete(vozilo.slike[i].id)
        }

        for(let i = 0; i < vozilo.likes.length;i++){
            await this.likeRepository.delete(vozilo.likes[i].id)
        }

        for(let i = 0; i < vozilo.iznajmljivanja.length;i++){
            await this.iznajmnjivanjeRepository.delete(vozilo.iznajmljivanja[i].id)
        }
        

        await this.voziloRepository.delete(id);
    }
}

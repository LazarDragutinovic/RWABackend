import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PopravkaDto } from 'src/dtos/popravka.dto';
import { Centar } from 'src/models/centar';
import { Popravka } from 'src/models/popravka';
import { Pozicija, Radnik } from 'src/models/radnik';
import { Vozilo } from 'src/models/vozilo';
import { Repository, TreeRepositoryUtils } from 'typeorm';

@Injectable()
export class PopravkaService {

    constructor(@InjectRepository(Popravka) private popravkaRepository: Repository<Popravka>,
                @InjectRepository(Centar) private centarRepository: Repository<Centar>,    
                @InjectRepository(Vozilo) private voziloRepository: Repository<Vozilo>,
                @InjectRepository(Radnik) private radnikRepository: Repository<Radnik>
                ){}

    async svePopravkeZaJedanCentar(id:number){
        let centar = await this.centarRepository.findOne({where:{id},relations:["vozila"]})
        if(!centar) throw new HttpException("Nema tog centra",HttpStatus.NOT_FOUND);
        let popravke: Popravka[] = []
        for(let i = 0; i < centar.vozila.length;i++){
            let novepopravke = (await this.popravkaRepository.find({where:{vozilo:{id:centar.vozila[i].id}},relations:[
                "vozilo",
                "vozilo.voziloLogicko",
                "mehanicar"
            ]}))
            novepopravke.forEach(p=>popravke.push(p));
        }
        popravke.sort((x,y)=>{
            if(!x.obavljena && !y.obavljena) return 0;
            if(!x.obavljena && y.obavljena) return -1;
            return 1;
        })
        return popravke;
    }

    async prijaviPopravku(idVozilo:number){
        let popravka=new Popravka();
        
        popravka.obavljena=false;
        let vozilo = await this.voziloRepository.findOne({where:{id:idVozilo},relations:['voziloLogicko']});
        
        if(!vozilo) throw new HttpException("Nema tog vozila.",HttpStatus.NOT_FOUND);
        
        popravka.vozilo = vozilo;
        popravka.cena = 0;
        popravka.opis = ""
        
        popravka = await this.popravkaRepository.save(popravka);
        popravka.mehanicar = null;
        return popravka;
    }


    async preuzmiPopravku(idMehanicara: number, idPopravke: number){
        let mehanicar = await this.radnikRepository.findOne({where:{id:idMehanicara}});
        if(!mehanicar && mehanicar.pozicija != Pozicija.MEHANICAR) throw new HttpException("Nema tog mehanicara.",HttpStatus.NOT_FOUND);
        let popravka = await this.popravkaRepository.findOne({where:{id:idPopravke}, relations:["mehanicar"]});
        if(!popravka) throw new HttpException("Nema te popravke.",HttpStatus.NOT_FOUND);
        if(popravka.mehanicar) throw new HttpException("Ne moze da preuzmete ovu popravku.",HttpStatus.UNAUTHORIZED)

        popravka.mehanicar = mehanicar;

        this.popravkaRepository.update(idPopravke, popravka);

        return popravka;
        
    }

    async obaviPopravku(id:number,opis: string, cena: number){
        let popravka = await this.popravkaRepository.findOne({where:{id}});
        if(!popravka) throw new HttpException("Nema te popravke.",HttpStatus.NOT_FOUND);
        popravka.obavljena = true;
        popravka.opis = opis;
        popravka.cena = cena;
        

        this.popravkaRepository.update(id,popravka);

        return popravka;
    }
}

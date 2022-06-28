import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Centar } from 'src/models/centar';
import { RadiU } from 'src/models/radi-u';
import { Radnik } from 'src/models/radnik';
import { IsNull, Repository } from 'typeorm';

@Injectable()
export class OdobriRasporediService {

    constructor(@InjectRepository(Radnik) private radnikRepositoty:Repository<Radnik>,
                @InjectRepository(Centar) private centarRepository: Repository<Centar>,
                @InjectRepository(RadiU) private radiURepository: Repository<RadiU>){}

    async OdobriNalog(id:number){
        let radnik = await this.radnikRepositoty.findOne({where:{id}});
        if(!radnik) throw new HttpException("Nema tog radnika.",HttpStatus.NOT_FOUND);
        radnik.odobren = true;
        await this.radnikRepositoty.update(id,radnik);
    }

    async ZabraniNalog(id:number){
        let radnik = await this.radnikRepositoty.findOne({where:{id}});
        if(!radnik) throw new HttpException("Nema tog radnika.",HttpStatus.NOT_FOUND);
        radnik.odobren = false;
        await this.radnikRepositoty.update(id,radnik);
    }

    async rasporedi(idr:number,idc:number) {
       
        let predhodni = await this.radiURepository.findOne({where: {radnik:{id:idr},datumDo:IsNull()}})
       
        if(predhodni) {
            predhodni.datumDo = new Date(Date.now());
            await this.radiURepository.save(predhodni);
        }
        let noviPosao = new RadiU();
        let radnik = await this.radnikRepositoty.findOne({where:{id:idr}});
        let centar = await this.centarRepository.findOne({where:{id:idc}});
        
        if(!radnik || !centar) throw new HttpException("Nema ili radnika ili centra",HttpStatus.NOT_FOUND);
        
        noviPosao.centar = centar;
        noviPosao.radnik = radnik; 
        noviPosao.datumOd = new Date(Date.now());
        noviPosao.datumDo = null;
        await this.radiURepository.save(noviPosao);
        return noviPosao.centar
    }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CentarDto } from 'src/dtos/centar.dto';
import { Centar } from 'src/models/centar';
import { RadiU } from 'src/models/radi-u';
import { Repository } from 'typeorm';

@Injectable()
export class CentarService {


    constructor(@InjectRepository(Centar) private centarRepository: Repository<Centar>,
                @InjectRepository(RadiU) private radiURepository: Repository<RadiU>
    ){}

    async preuzmiCentre() {          
        return await this.centarRepository.find({relations:["slika"]});
    }

    async dodajCentar(centarDto: CentarDto) {
        let centar = this.centarRepository.create(centarDto);
        await this.centarRepository.save(centar);
        return new CentarDto(centar);
    }

    async obrisiCentar(id: number) {
        this.centarRepository.delete(id);
    }

    async izmeniCentar(centarDto: CentarDto) {
        let centar = this.centarRepository.findOne({where: {id: centarDto.id}});
        if(centar === null) throw new HttpException("Taj centar ne postoji", HttpStatus.NOT_FOUND)
        await this.centarRepository.update(centarDto.id,centarDto);
        return centarDto;
    }

    async centarRadnika(id:number) {
        let posao = await this.radiURepository.findOne({where:{radnik:{id},datumOd:null},relations:["centar"]})
        
        return posao.centar;
    }
}

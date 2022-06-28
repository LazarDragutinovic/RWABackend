import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CentarDto } from 'src/dtos/centar.dto';
import { Centar } from 'src/models/centar';
import { RadiU } from 'src/models/radi-u';
import { Vozilo } from 'src/models/vozilo';
import { IsNull, Repository } from 'typeorm';

@Injectable()
export class CentarService {


    constructor(@InjectRepository(Centar) private centarRepository: Repository<Centar>,
                @InjectRepository(RadiU) private radiURepository: Repository<RadiU>,
                @InjectRepository(Vozilo) private voziloRepository: Repository<Vozilo>
                ){}

    async postaviCentarVozila(idc: number, idv: number){
        let centar = await this.centarRepository.findOne({where:{id:idc}});
        if(!centar) throw new HttpException("Nema tog centra",HttpStatus.NOT_FOUND);
        let vozilo = await this.voziloRepository.findOne({where:{id:idv}})
        if(!vozilo) throw new HttpException("Nema tog vozila.",HttpStatus.NOT_FOUND);
        vozilo.centar = centar;
        await this.voziloRepository.update(vozilo.id, vozilo);
    }

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
        let predhodni = await this.radiURepository.findOne({where: {radnik:{id:id},datumDo:IsNull()},relations:["centar"]})
        if(!predhodni) return null
        return predhodni.centar;
    }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CentarDto } from 'src/dtos/centar.dto';
import { Centar } from 'src/models/centar';
import { Repository } from 'typeorm';

@Injectable()
export class CentarService {


    constructor(@InjectRepository(Centar) private centarRepository: Repository<Centar>){}

    async preuzmiCentre() {
        return await this.centarRepository.find();
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
}

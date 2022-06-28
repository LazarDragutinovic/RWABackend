import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { SastanakDto } from 'src/dtos/sastanak.dto';
import { Pozicija, Radnik } from 'src/models/radnik';
import { Sastanak, Status } from 'src/models/sastanak';
import { Repository } from 'typeorm';

@Injectable()
export class SastanakService {
    constructor(@InjectRepository(Sastanak) private sastanakRepository: Repository<Sastanak>,
                @InjectRepository(Radnik) private radnikRepository: Repository<Radnik>){}

    async kreirajSastanak(idr: number, tema:string, mesto: string, vreme:Date){
        let radnik = await this.radnikRepository.findOne({where:{id:idr}});
        if(!radnik) throw new HttpException("Nema tog radnika", HttpStatus.NOT_FOUND);
        if(radnik.pozicija !== Pozicija.UPRAVNIK) throw new HttpException("Ranik nije upravnik",HttpStatus.UNAUTHORIZED);
        let sastanak = new Sastanak();
        sastanak.mesto = mesto;
        sastanak.tema = tema;
        sastanak.vreme = vreme;
        sastanak.status = Status.OK
        sastanak.zakazao = radnik;
        sastanak = await this.sastanakRepository.save(sastanak);
        return new SastanakDto(sastanak);
    }

    async sastanakOk(id:number) {
        let sastanak   = await this.sastanakRepository.findOne({where: {id}});
        if(!sastanak) throw new HttpException("Nema tog sastanka.",HttpStatus.NOT_FOUND);
        sastanak.status = Status.OK
        this.sastanakRepository.update(id,sastanak);   
    }

    async odloziSastanak(id: number) {
        let sastanak   = await this.sastanakRepository.findOne({where: {id}});
        if(!sastanak) throw new HttpException("Nema tog sastanka.",HttpStatus.NOT_FOUND);
        sastanak.status = Status.ODLOZEN
        this.sastanakRepository.update(id,sastanak);
    }
    async otkaziSastanak(id :number) {
        let sastanak   = await this.sastanakRepository.findOne({where: {id}});
        if(!sastanak) throw new HttpException("Nema tog sastanka.",HttpStatus.NOT_FOUND);
        sastanak.status = Status.OTKAZAN
        await this.sastanakRepository.update(id,sastanak)
    }

    async PozoviRadnika(id: number, ids: number) {
        let sastanak = await this.sastanakRepository.findOne({where:{id:ids},relations:["pozvani"]})
        if(!sastanak) throw new HttpException("Nema tog sastanka",HttpStatus.NOT_FOUND);
        let radnik  = await this.radnikRepository.findOne({where: {id}});
        if(!radnik)  throw new HttpException("Nema tog radnika",HttpStatus.NOT_FOUND);
        sastanak.pozvani.push(radnik);
        await this.sastanakRepository.save(sastanak);
    }

    async sviPozvaniNaSastanak(id: number){
        let pozvani = await this.radnikRepository.find({where:{sastanci:{id}}})
        return pozvani;
    }

    async sviSastanciUpravnika(id: number) {
        let sastanci = await this.sastanakRepository.find({where:{zakazao:{id}}})
        return sastanci;
    }

    async OpozoviRadnika(id: number, ids: number) {
        let sastanak = await this.sastanakRepository.findOne({where:{id:ids},relations:["pozvani"]})
        if(!sastanak) throw new HttpException("Nema tog sastanka",HttpStatus.NOT_FOUND);
        sastanak.pozvani = sastanak.pozvani.filter(radnik=>radnik.id !== id);
        await this.sastanakRepository.save(sastanak)
    }

    async MojiSastanci(id: number) {
        let sastanci = await this.sastanakRepository.find({where:{pozvani:{id}},relations:["zakazao"]})
        return sastanci
    }
}

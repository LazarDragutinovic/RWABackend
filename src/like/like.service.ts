import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Korisnik } from 'src/models/korisnik';
import { Vozilo } from 'src/models/vozilo';
import { Repository } from 'typeorm';
import { Like } from "../models/like"

@Injectable()
export class LikeService {

    constructor(@InjectRepository(Like) private likeRepository: Repository<Like>,
                @InjectRepository(Korisnik) private korisnikRepository: Repository<Korisnik>,
                @InjectRepository(Vozilo) private voziloRepository: Repository<Vozilo>
    ){}


    async likeKorisnika(idk: number,idv:number){
        let like = await this.likeRepository.findOne({where:{korisnik:{id:idk},vozilo:{id:idv}}})
        if(!like) return -1;
        return like.id;
    }

    async like(idKorisnik: number, idVozilo: number) {
        let like = await this.likeRepository.findOne({where:{vozilo:{id: idVozilo}, korisnik: {id: idKorisnik}}})
        if( like !== null ) throw new HttpException("Vec postoji like.",HttpStatus.UNAUTHORIZED)

        like = new Like();
        let korisnik = await this.korisnikRepository.findOne({where: {id:idKorisnik}});
        let vozilo = await this.voziloRepository.findOne({where:{id:idVozilo}});

        if(korisnik == null || vozilo == null) throw new HttpException("Nemostoje ili korisnik ili vozilo",HttpStatus.NOT_FOUND);

        like.korisnik = korisnik;
        like.vozilo = vozilo;

        like = await this.likeRepository.save(like);

        return like.id;

    }
    async obrisiLike(id : number){
        let like = await this.likeRepository.findOne({where:{id}});
        if(like === null) throw new HttpException("Nema tog like-a",HttpStatus.NOT_FOUND);
        this.likeRepository.delete(like);
    }

    async brojLikova(idVozilo: number) {
        let vozilo = await this.voziloRepository.findOne({where:{id:idVozilo},relations:["likes"]});     
        
        if(vozilo === null) throw new HttpException("Nema tog vozila.", HttpStatus.NOT_FOUND);

        let broj = vozilo.likes.length;
        return broj;
    }
}

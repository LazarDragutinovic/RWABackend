import { Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import JwtAuthenticationGuard from 'src/autentifikacija/jwtauth.guard';
import { LocalAuthenticationGuard } from 'src/autentifikacija/localauten.guards';
import { LikeService } from './like.service';

@Controller('like')
export class LikeController {

    constructor(private likeService: LikeService){}

    @UseGuards(JwtAuthenticationGuard)
    @Post("DodajLike/:idVozilo/:idKorisnik")
    dodajLike(@Param("idVozilo", ParseIntPipe) idVozilo: number, @Param("idKorisnik",ParseIntPipe) idKorisnik) {
        
        return this.likeService.like(idKorisnik,idVozilo);
    }

    @UseGuards(JwtAuthenticationGuard)
    @Get("likeKorisnika/:idk/:idv")
    likeKorisnika(@Param("idk",ParseIntPipe) idk: number, @Param("idv",ParseIntPipe) idv: number) {
        return this.likeService.likeKorisnika(idk,idv)
    }

    @UseGuards(JwtAuthenticationGuard)
    @Delete("obrisi/:id")
    obrisiLike(@Param("id",ParseIntPipe) id: number) {
        console.log(id)
        this.likeService.obrisiLike(id);
    }

    @Get("LikoviVozila/:idVozila")
    likoviVozila(@Param("idVozila",ParseIntPipe) idVozila: number){
        return this.likeService.brojLikova(idVozila);
    }
    
}

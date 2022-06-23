import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Korisnik } from 'src/models/korisnik';
import { KorisnikController } from './korisnik/korisnik.controller';
import { KorisnikService } from './korisnik/korisnik.service';


@Module({
  imports:[TypeOrmModule.forFeature([Korisnik])],
  controllers: [KorisnikController, KorisnikController],
  providers: [KorisnikService]
})
export class KorisnikModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Korisnik } from 'src/models/korisnik';
import { KorisnikController } from './korisnik/korisnik.controller';
import { KorisnikService } from './korisnik/korisnik.service';
import { AuthentService } from './authent/authent.service';

@Module({
  imports:[TypeOrmModule.forFeature([Korisnik])],
  controllers: [KorisnikController, KorisnikController],
  providers: [KorisnikService, AuthentService]
})
export class KorisnikModule {}

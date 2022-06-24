import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Iznajmljivanje } from 'src/models/iznajmljivanje';
import { Korisnik } from 'src/models/korisnik';
import { Radnik } from 'src/models/radnik';
import { Vozilo } from 'src/models/vozilo';
import { IznajmljivanjeController } from './iznajmljivanje.controller';
import { IznajmljivanjeService } from './iznajmljivanje.service';

@Module({
  imports:[TypeOrmModule.forFeature([Korisnik,Vozilo,Radnik,Iznajmljivanje])],
  controllers: [IznajmljivanjeController],
  providers: [IznajmljivanjeService]
})
export class IznajmljivanjeModule {}

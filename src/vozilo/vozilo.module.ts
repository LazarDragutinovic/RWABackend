import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Iznajmljivanje } from 'src/models/iznajmljivanje';
import { Korisnik } from 'src/models/korisnik';
import { Vozilo } from 'src/models/vozilo';
import { VoziloLogicko } from 'src/models/voziloLogicko';
import { VoziloController } from './vozilo.controller';
import { VoziloService } from './vozilo.service';

@Module({
  imports:[TypeOrmModule.forFeature([Vozilo,VoziloLogicko,Iznajmljivanje,Korisnik])],
  controllers: [VoziloController],
  providers: [VoziloService]
})
export class VoziloModule {}

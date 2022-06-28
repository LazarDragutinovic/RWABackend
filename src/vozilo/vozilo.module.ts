import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Iznajmljivanje } from 'src/models/iznajmljivanje';
import { Korisnik } from 'src/models/korisnik';
import { SlikaAutomobila } from 'src/models/slika-Automobila';
import { Vozilo } from 'src/models/vozilo';
import { VoziloLogicko } from 'src/models/voziloLogicko';
import { Like as LikeV} from "../models/like"
import { VoziloController } from './vozilo.controller';
import { VoziloService } from './vozilo.service';

@Module({
  imports:[TypeOrmModule.forFeature([Vozilo,VoziloLogicko,Iznajmljivanje,Korisnik,SlikaAutomobila,LikeV])],
  controllers: [VoziloController],
  providers: [VoziloService]
})
export class VoziloModule {}

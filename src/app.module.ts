import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConnectionOptions } from 'typeorm.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RadnikModule } from './radnik/radnik.module';
import { KorisnikModule } from './korisnik/korisnik.module';
import { AutentifikacijaModule } from './autentifikacija/autentifikacija.module';
import { VoziloModule } from './vozilo/vozilo.module';
import { AutentifikacijaRadnikModule } from './autentifikacija-radnik/autentifikacija-radnik.module';
import { CentarModule } from './centar/centar.module';
import { VoziloLogickoModule } from './vozilo-logicko/vozilo-logicko.module';
import { LikeModule } from './like/like.module';
import { IznajmljivanjeModule } from './iznajmljivanje/iznajmljivanje.module';
import { PopravkaModule } from './popravka/popravka.module';
import { OdobriRasporediModule } from './odobri-rasporedi/odobri-rasporedi.module';
import { SastanakModule } from './sastanak/sastanak.module';

@Module({
  imports: [RadnikModule,TypeOrmModule.forRoot(typeOrmConnectionOptions), KorisnikModule, AutentifikacijaModule, VoziloModule, AutentifikacijaRadnikModule, CentarModule, VoziloLogickoModule, LikeModule, IznajmljivanjeModule, PopravkaModule, OdobriRasporediModule, SastanakModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

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

@Module({
  imports: [RadnikModule,TypeOrmModule.forRoot(typeOrmConnectionOptions), KorisnikModule, AutentifikacijaModule, VoziloModule, AutentifikacijaRadnikModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

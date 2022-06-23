import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConnectionOptions } from 'typeorm.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RadnikModule } from './radnik/radnik.module';
import { KorisnikModule } from './korisnik/korisnik.module';
import { AutentifikacijaModule } from './autentifikacija/autentifikacija.module';

@Module({
  imports: [RadnikModule,TypeOrmModule.forRoot(typeOrmConnectionOptions), KorisnikModule, AutentifikacijaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

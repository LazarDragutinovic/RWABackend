import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { jwtConstants } from 'src/constants';
import { Radnik } from 'src/models/radnik';
import { RadnikServiceService } from 'src/radnik/radnik-service/radnik-service.service';
import { RadnikModule } from 'src/radnik/radnik.module';
import { AutentifikacijaRadnikController } from './autentifikacija-radnik.controller';
import { AutentifikacijaRadnikService } from './autentifikacija-radnik.service';
import { JwtStrategy } from './jwtStrategy.strategy';
import { LocalStrategy } from './local.radnik.strategy';

@Module({
  imports:[TypeOrmModule.forFeature([Radnik]),PassportModule,RadnikModule,JwtModule.register({
    secret: jwtConstants.secretRadnik,
    signOptions: {
        expiresIn: jwtConstants.expiration+"s"
    }
})],
  providers: [AutentifikacijaRadnikService,LocalStrategy,JwtStrategy,RadnikServiceService],
  controllers:[AutentifikacijaRadnikController]
})
export class AutentifikacijaRadnikModule {}

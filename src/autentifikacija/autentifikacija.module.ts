import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { jwtConstants } from 'src/constants';
import { KorisnikModule } from 'src/korisnik/korisnik.module';
import { KorisnikService } from 'src/korisnik/korisnik/korisnik.service';
import { Korisnik } from 'src/models/korisnik';
import { AutenController } from './auten/auten.controller';
import { AutenService } from './auten/auten.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './localStrategy';

@Module({
    imports:[
        TypeOrmModule.forFeature([Korisnik]),
        PassportModule,
        KorisnikModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: {
                expiresIn: jwtConstants.expiration+"s"
            }
        })
    ],
    providers:[LocalStrategy,AutenService,JwtStrategy,KorisnikService],
    controllers:[AutenController]
})
export class AutentifikacijaModule {}

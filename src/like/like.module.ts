import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Korisnik } from 'src/models/korisnik';
import { Like } from 'src/models/like';
import { Vozilo } from 'src/models/vozilo';
import { LikeController } from './like.controller';
import { LikeService } from './like.service';

@Module({
  imports:[TypeOrmModule.forFeature([Like,Korisnik,Vozilo])],
  controllers: [LikeController],
  providers: [LikeService]
})
export class LikeModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Centar } from 'src/models/centar';
import { Popravka } from 'src/models/popravka';
import { Radnik } from 'src/models/radnik';
import { Vozilo } from 'src/models/vozilo';
import { PopravkaController } from './popravka.controller';
import { PopravkaService } from './popravka.service';

@Module({
  imports:[TypeOrmModule.forFeature([Popravka,Centar,Vozilo,Radnik])],
  controllers: [PopravkaController],
  providers: [PopravkaService]
})
export class PopravkaModule {}

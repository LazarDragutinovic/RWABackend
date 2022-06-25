import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Radnik } from 'src/models/radnik';
import { Sastanak } from 'src/models/sastanak';
import { SastanakController } from './sastanak.controller';
import { SastanakService } from './sastanak.service';

@Module({
  imports:[TypeOrmModule.forFeature([Radnik,Sastanak])],
  controllers: [SastanakController],
  providers: [SastanakService]
})
export class SastanakModule {}

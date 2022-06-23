import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vozilo } from 'src/models/vozilo';
import { VoziloController } from './vozilo.controller';
import { VoziloService } from './vozilo.service';

@Module({
  imports:[TypeOrmModule.forFeature([Vozilo])],
  controllers: [VoziloController],
  providers: [VoziloService]
})
export class VoziloModule {}

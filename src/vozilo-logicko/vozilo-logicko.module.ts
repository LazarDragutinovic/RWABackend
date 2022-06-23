import { Module } from '@nestjs/common';
import { VoziloLogickoService } from './vozilo-logicko.service';
import { VoziloLogickoController } from './vozilo-logicko.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VoziloLogicko } from 'src/models/voziloLogicko';

@Module({
  imports:[TypeOrmModule.forFeature([VoziloLogicko])],
  providers: [VoziloLogickoService,],
  controllers: [VoziloLogickoController]
})
export class VoziloLogickoModule {}

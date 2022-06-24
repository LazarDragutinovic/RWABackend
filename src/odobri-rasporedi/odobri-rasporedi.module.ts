import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Centar } from 'src/models/centar';
import { RadiU } from 'src/models/radi-u';
import { Radnik } from 'src/models/radnik';
import { OdobriRasporediController } from './odobri-rasporedi.controller';
import { OdobriRasporediService } from './odobri-rasporedi.service';

@Module({
  imports:[TypeOrmModule.forFeature([Radnik,Centar,RadiU])],
  controllers: [OdobriRasporediController],
  providers: [OdobriRasporediService]
})
export class OdobriRasporediModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Centar } from 'src/models/centar';
import { CentarController } from './centar.controller';
import { CentarService } from './centar.service';

@Module({
  imports:[TypeOrmModule.forFeature([Centar])],
  controllers: [CentarController],
  providers: [CentarService]
})
export class CentarModule {}

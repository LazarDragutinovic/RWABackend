import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Radnik } from 'src/models/radnik';
import { RadnikControllerController } from './radnik-controller/radnik-controller.controller';
import { RadnikServiceService } from './radnik-service/radnik-service.service';

@Module({
  imports:[TypeOrmModule.forFeature([Radnik])],
  controllers: [RadnikControllerController],
  providers: [RadnikServiceService]
})
export class RadnikModule {}

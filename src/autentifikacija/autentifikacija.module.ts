import { Module } from '@nestjs/common';
import { AutenService } from './auten/auten.service';
import { AutenController } from './auten/auten.controller';

@Module({
  providers: [AutenService],
  controllers: [AutenController]
})
export class AutentifikacijaModule {}

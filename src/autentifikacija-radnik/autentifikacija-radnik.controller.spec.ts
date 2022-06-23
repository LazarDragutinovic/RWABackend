import { Test, TestingModule } from '@nestjs/testing';
import { AutentifikacijaRadnikController } from './autentifikacija-radnik.controller';

describe('AutentifikacijaRadnikController', () => {
  let controller: AutentifikacijaRadnikController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AutentifikacijaRadnikController],
    }).compile();

    controller = module.get<AutentifikacijaRadnikController>(AutentifikacijaRadnikController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

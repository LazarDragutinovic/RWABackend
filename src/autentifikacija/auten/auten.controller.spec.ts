import { Test, TestingModule } from '@nestjs/testing';
import { AutenController } from './auten.controller';

describe('AutenController', () => {
  let controller: AutenController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AutenController],
    }).compile();

    controller = module.get<AutenController>(AutenController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

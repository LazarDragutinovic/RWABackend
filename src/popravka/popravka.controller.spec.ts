import { Test, TestingModule } from '@nestjs/testing';
import { PopravkaController } from './popravka.controller';

describe('PopravkaController', () => {
  let controller: PopravkaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PopravkaController],
    }).compile();

    controller = module.get<PopravkaController>(PopravkaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

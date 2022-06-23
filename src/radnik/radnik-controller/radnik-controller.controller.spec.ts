import { Test, TestingModule } from '@nestjs/testing';
import { RadnikControllerController } from './radnik-controller.controller';

describe('RadnikControllerController', () => {
  let controller: RadnikControllerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RadnikControllerController],
    }).compile();

    controller = module.get<RadnikControllerController>(RadnikControllerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

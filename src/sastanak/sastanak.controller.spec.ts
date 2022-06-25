import { Test, TestingModule } from '@nestjs/testing';
import { SastanakController } from './sastanak.controller';

describe('SastanakController', () => {
  let controller: SastanakController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SastanakController],
    }).compile();

    controller = module.get<SastanakController>(SastanakController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

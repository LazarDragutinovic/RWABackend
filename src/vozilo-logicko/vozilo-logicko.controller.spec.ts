import { Test, TestingModule } from '@nestjs/testing';
import { VoziloLogickoController } from './vozilo-logicko.controller';

describe('VoziloLogickoController', () => {
  let controller: VoziloLogickoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VoziloLogickoController],
    }).compile();

    controller = module.get<VoziloLogickoController>(VoziloLogickoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

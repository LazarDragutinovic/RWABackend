import { Test, TestingModule } from '@nestjs/testing';
import { VoziloLogickoService } from './vozilo-logicko.service';

describe('VoziloLogickoService', () => {
  let service: VoziloLogickoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VoziloLogickoService],
    }).compile();

    service = module.get<VoziloLogickoService>(VoziloLogickoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

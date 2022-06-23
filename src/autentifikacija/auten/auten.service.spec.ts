import { Test, TestingModule } from '@nestjs/testing';
import { AutenService } from './auten.service';

describe('AutenService', () => {
  let service: AutenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AutenService],
    }).compile();

    service = module.get<AutenService>(AutenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

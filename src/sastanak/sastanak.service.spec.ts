import { Test, TestingModule } from '@nestjs/testing';
import { SastanakService } from './sastanak.service';

describe('SastanakService', () => {
  let service: SastanakService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SastanakService],
    }).compile();

    service = module.get<SastanakService>(SastanakService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

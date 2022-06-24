import { Test, TestingModule } from '@nestjs/testing';
import { PopravkaService } from './popravka.service';

describe('PopravkaService', () => {
  let service: PopravkaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PopravkaService],
    }).compile();

    service = module.get<PopravkaService>(PopravkaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

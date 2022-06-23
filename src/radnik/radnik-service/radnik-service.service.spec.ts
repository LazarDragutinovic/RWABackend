import { Test, TestingModule } from '@nestjs/testing';
import { RadnikServiceService } from './radnik-service.service';

describe('RadnikServiceService', () => {
  let service: RadnikServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RadnikServiceService],
    }).compile();

    service = module.get<RadnikServiceService>(RadnikServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

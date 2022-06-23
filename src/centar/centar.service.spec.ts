import { Test, TestingModule } from '@nestjs/testing';
import { CentarService } from './centar.service';

describe('CentarService', () => {
  let service: CentarService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CentarService],
    }).compile();

    service = module.get<CentarService>(CentarService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

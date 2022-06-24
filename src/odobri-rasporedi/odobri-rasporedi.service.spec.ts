import { Test, TestingModule } from '@nestjs/testing';
import { OdobriRasporediService } from './odobri-rasporedi.service';

describe('OdobriRasporediService', () => {
  let service: OdobriRasporediService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OdobriRasporediService],
    }).compile();

    service = module.get<OdobriRasporediService>(OdobriRasporediService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { IznajmljivanjeService } from './iznajmljivanje.service';

describe('IznajmljivanjeService', () => {
  let service: IznajmljivanjeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IznajmljivanjeService],
    }).compile();

    service = module.get<IznajmljivanjeService>(IznajmljivanjeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

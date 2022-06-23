import { Test, TestingModule } from '@nestjs/testing';
import { AutentifikacijaRadnikService } from './autentifikacija-radnik.service';

describe('AutentifikacijaRadnikService', () => {
  let service: AutentifikacijaRadnikService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AutentifikacijaRadnikService],
    }).compile();

    service = module.get<AutentifikacijaRadnikService>(AutentifikacijaRadnikService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

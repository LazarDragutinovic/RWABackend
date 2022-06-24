import { Test, TestingModule } from '@nestjs/testing';
import { OdobriRasporediController } from './odobri-rasporedi.controller';

describe('OdobriRasporediController', () => {
  let controller: OdobriRasporediController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OdobriRasporediController],
    }).compile();

    controller = module.get<OdobriRasporediController>(OdobriRasporediController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

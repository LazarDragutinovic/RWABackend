import { Test, TestingModule } from '@nestjs/testing';
import { CentarController } from './centar.controller';

describe('CentarController', () => {
  let controller: CentarController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CentarController],
    }).compile();

    controller = module.get<CentarController>(CentarController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

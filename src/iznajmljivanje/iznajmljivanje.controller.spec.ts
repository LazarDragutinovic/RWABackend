import { Test, TestingModule } from '@nestjs/testing';
import { IznajmljivanjeController } from './iznajmljivanje.controller';

describe('IznajmljivanjeController', () => {
  let controller: IznajmljivanjeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IznajmljivanjeController],
    }).compile();

    controller = module.get<IznajmljivanjeController>(IznajmljivanjeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

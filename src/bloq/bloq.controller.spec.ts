import { Test, TestingModule } from '@nestjs/testing';
import { BloqController } from './bloq.controller';
import { BloqService } from './bloq.service';

describe('BloqController', () => {
  let controller: BloqController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BloqController],
      providers: [BloqService],
    }).compile();

    controller = module.get<BloqController>(BloqController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

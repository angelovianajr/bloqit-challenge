import { Test, TestingModule } from '@nestjs/testing';
import { BloqService } from './bloq.service';

describe('BloqService', () => {
  let service: BloqService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BloqService],
    }).compile();

    service = module.get<BloqService>(BloqService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

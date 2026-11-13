import { Test, TestingModule } from '@nestjs/testing';
import { AuctionsController } from './auctions.controller';
import { AuctionsService } from './auctions.service';
import { OffersService } from '../offers/offers.service';

describe('AuctionsController', () => {
  let controller: AuctionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuctionsController],
      providers: [
        { provide: AuctionsService, useValue: {} },
        { provide: OffersService, useValue: {} },
      ],
    }).compile();

    controller = module.get<AuctionsController>(AuctionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

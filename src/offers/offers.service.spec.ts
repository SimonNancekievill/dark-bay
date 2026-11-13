import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { OffersService } from './offers.service';
import { Offer } from './entities/offer.entity';
import { Auction } from '../auctions/entities/auction.entity';
import { User } from '../users/entities/user.entity';

const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;

const seller = { id: 'seller-1' } as User;
const bidder = { id: 'bidder-1' } as User;

describe('OffersService', () => {
  let service: OffersService;
  const offers = {
    create: vi.fn((offer: Partial<Offer>) => offer),
    save: vi.fn((offer: Partial<Offer>) => Promise.resolve(offer)),
  };
  const auctions = {
    findOne: vi.fn(),
    save: vi.fn((auction: Partial<Auction>) => Promise.resolve(auction)),
  };

  const openAuction = () => ({
    id: 'a1',
    seller,
    startingPrice: 10,
    currentPrice: null,
    endDate: new Date(Date.now() + ONE_DAY_IN_MS),
  });

  beforeEach(async () => {
    vi.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OffersService,
        { provide: getRepositoryToken(Offer), useValue: offers },
        { provide: getRepositoryToken(Auction), useValue: auctions },
      ],
    }).compile();

    service = module.get<OffersService>(OffersService);
  });

  it('saves the offer and raises the current price', async () => {
    auctions.findOne.mockResolvedValue(openAuction());

    const offer = await service.create('a1', { offerPrice: 15 }, bidder);

    expect(offer.bidder).toBe(bidder);
    expect(auctions.save).toHaveBeenCalledWith(expect.objectContaining({ currentPrice: 15 }));
  });

  it('does not let sellers bid on their own auction', async () => {
    auctions.findOne.mockResolvedValue(openAuction());

    await expect(service.create('a1', { offerPrice: 15 }, seller)).rejects.toThrow(
      'You cannot bid on your own auctions.',
    );
  });

  it('rejects offers that are not above the current price', async () => {
    auctions.findOne.mockResolvedValue({ ...openAuction(), currentPrice: 20 });

    await expect(service.create('a1', { offerPrice: 20 }, bidder)).rejects.toThrow(
      'Offer price must be higher than required price.',
    );
    expect(offers.save).not.toHaveBeenCalled();
  });

  it('rejects offers on ended auctions', async () => {
    auctions.findOne.mockResolvedValue({
      ...openAuction(),
      endDate: new Date(Date.now() - 1000),
    });

    await expect(service.create('a1', { offerPrice: 15 }, bidder)).rejects.toThrow(
      'Auction has already ended.',
    );
  });
});

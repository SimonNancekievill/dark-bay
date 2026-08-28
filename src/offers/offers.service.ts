import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOfferDto } from './dtos/createOffer.dto';
import { UpdateOfferDto } from './dtos/updateOffer.dto';
import { Repository } from 'typeorm';
import { Offer } from './entities/offer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Auction } from '../auctions/entities/auction.entity';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private readonly offers: Repository<Offer>,
    @InjectRepository(Auction)
    private readonly auctions: Repository<Auction>,
  ) {}
  async create(auctionId: string, offerPayload: CreateOfferDto) {
    const auction = await this.auctions.findOneBy({ id: auctionId });

    if (!auction) {
      throw new NotFoundException(`Auction with ID ${auctionId} not found.`);
    }

    if (offerPayload.offerPrice < auction.startingPrice) {
      throw new ConflictException(
        `Offer price of ${offerPayload.offerPrice} is less than starting price (${auction.startingPrice})`,
      );
    }

    if (offerPayload.offerPrice < auction.currentPrice) {
      throw new ConflictException(
        `Offer price of ${offerPayload.offerPrice} is less than current price (${auction.currentPrice})`,
      );
    }

    const offerCreation = new Date();

    if (offerCreation.getTime() > auction.endDate.getTime()) {
      throw new ConflictException(`Auction has already ended.`);
    }

    const offer = this.offers.create({
      ...offerPayload,
      createdAt: offerCreation,
      auction,
    });

    return this.offers.save(offer);
  }

  async findAll(auctionId: string) {
    const auction = await this.auctions.findOneBy({ id: auctionId });
    if (!auction) {
      throw new NotFoundException(`Auction with ID ${auctionId} not found.`);
    }
    return this.offers.find({
      where: { auction: { id: auctionId } },
      order: { offerPrice: 'DESC' },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} offer`;
  }

  update(id: number, offerPayload: UpdateOfferDto) {
    return `This action updates a #${id} offer`;
  }

  remove(id: number) {
    return `This action removes a #${id} offer`;
  }
}

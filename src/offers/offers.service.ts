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
import { User } from '../users/entities/user.entity';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private readonly offers: Repository<Offer>,
    @InjectRepository(Auction)
    private readonly auctions: Repository<Auction>,
  ) {}
  async create(auctionId: string, offerPayload: CreateOfferDto, user: User) {
    const auction = await this.auctions.findOne({
      where: { id: auctionId },
      relations: {
        seller: true,
      },
    });

    if (!auction) {
      throw new NotFoundException(`Auction with ID ${auctionId} not found.`);
    }

    if (auction.seller.id === user.id) {
      throw new ConflictException(`You cannot bid on your own auctions.`);
    }

    if (
      offerPayload.offerPrice <= (auction.currentPrice ?? auction.startingPrice)
    ) {
      throw new ConflictException(
        `Offer price must be higher than required price.`,
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
      bidder: user,
    });

    auction.currentPrice = offerPayload.offerPrice;

    await this.auctions.save(auction);

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

  findOne(id: string) {
    return `This action returns a #${id} offer`;
  }

  remove(id: string, _user: User) {
    return `This action removes a #${id} offer`;
  }
}

import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOfferDto } from './dtos/createOffer.dto';
import { Repository } from 'typeorm';
import { Offer } from './entities/offer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Auction } from '../auctions/entities/auction.entity';
import { User } from '../users/entities/user.entity';

const ONE_HOUR_IN_MS = 60 * 60 * 1000;

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

  async remove(offerId: string, user: User) {
    const offer = await this.offers.findOne({
      where: { id: offerId },
      relations: {
        auction: true,
        bidder: true,
      },
    });

    if (!offer) {
      throw new NotFoundException(`Offer with ID ${offerId} not found.`);
    }

    if (offer.bidder.id !== user.id) {
      throw new ConflictException(`You can only delete your own offers.`);
    }

    const auction = await this.auctions.findOneBy({ id: offer.auction.id });
    if (auction!.endDate.getTime() <= new Date().getTime()) {
      throw new ConflictException(
        `Auction with ID ${auction!.id} has already ended.`,
      );
    }

    if (new Date().getTime() > auction!.endDate.getTime() - ONE_HOUR_IN_MS) {
      throw new ConflictException(
        'Cannot delete offer within one hour of auction end.',
      );
    }

    const result = await this.offers.delete(offerId);

    if ((result.affected ?? 0) < 1) {
      throw new ConflictException(
        `Offer with ID ${offerId} could not be deleted.`,
      );
    }

    return result;
  }
}

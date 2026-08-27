import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuctionDto } from './dto/createAuction.dto';
import { UpdateAuctionDto } from './dto/updateAuction.dto';
import { Repository } from 'typeorm';
import { Auction } from './entities/auction.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuctionsService {
  constructor(
    @InjectRepository(Auction)
    private readonly auctions: Repository<Auction>,
  ) {}

  create(auctionPayload: CreateAuctionDto) {
    const createdAt = new Date();
    const newAuction = this.auctions.create({
      ...auctionPayload,
      createdAt,
      endDate:
        auctionPayload.endDate ??
        new Date(createdAt.getTime() + 3 * 24 * 60 * 60 * 1000),
    });
    return this.auctions.save(newAuction);
  }

  findAll(): Promise<Auction[]> {
    return this.auctions.find();
  }

  async findOne(id: string): Promise<Auction> {
    const auction = await this.auctions.findOneBy({ id });
    if (!auction) {
      throw new NotFoundException(`Auction with ID ${id} not found.`);
    }
    return auction;
  }

  update(id: string, updateAuctionDto: UpdateAuctionDto) {
    return `This action updates a #${id} auction`;
  }

  remove(id: string) {
    return `This action removes a #${id} auction`;
  }
}

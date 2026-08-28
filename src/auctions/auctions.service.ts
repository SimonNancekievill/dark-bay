import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuctionDto } from './dtos/createAuction.dto';
import { UpdateAuctionDto } from './dtos/updateAuction.dto';
import { LessThan, MoreThanOrEqual, Repository } from 'typeorm';
import { Auction } from './entities/auction.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from '../common/dtos/paginationQueryDto.dto';

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

  findAll(pagination: PaginationQueryDto): Promise<Auction[]> {
    const { status } = pagination;
    const currentDate = new Date();
    const statusCommand =
      status === 'open' ? MoreThanOrEqual(currentDate) : LessThan(currentDate);
    const whereFilter = status ? { endDate: statusCommand } : {};
    return this.auctions.find({
      where: whereFilter,
      order: { endDate: 'ASC' },
    });
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

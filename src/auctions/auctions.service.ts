import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuctionDto } from './dtos/createAuction.dto';
import {
  Between,
  LessThan,
  LessThanOrEqual,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import { Auction } from './entities/auction.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from '../common/dtos/paginationQuery.dto';
import { PaginationMetaResponseDto } from '../common/dtos/paginationMetaResponse.dto';
import { User } from '../users/entities/user.entity';

const THREE_DAYS_IN_MS = 3 * 24 * 60 * 60 * 1000;

@Injectable()
export class AuctionsService {
  constructor(
    @InjectRepository(Auction)
    private readonly auctions: Repository<Auction>,
  ) {}

  async create(auctionPayload: CreateAuctionDto, userData: User) {
    const createdAt = new Date();
    const { id } = userData;
    const newAuction = this.auctions.create({
      ...auctionPayload,
      createdAt,
      seller: { id },
      endDate:
        auctionPayload.endDate ??
        new Date(createdAt.getTime() + THREE_DAYS_IN_MS),
    });
    return this.auctions.save(newAuction);
  }

  async findAll(
    pagination: PaginationQueryDto,
  ): Promise<{ data: Auction[]; meta: PaginationMetaResponseDto }> {
    const {
      page,
      limit,
      status,
      'min-price': minPrice,
      'max-price': maxPrice,
    } = pagination;

    const currentDate = new Date();
    const statusCommand =
      status === 'open' ? MoreThanOrEqual(currentDate) : LessThan(currentDate);
    let whereFilter = {};

    if (status) {
      whereFilter = { ...whereFilter, endDate: statusCommand };
    }

    if (minPrice && maxPrice) {
      whereFilter = {
        ...whereFilter,
        startingPrice: Between(minPrice, maxPrice),
      };
    } else if (minPrice) {
      whereFilter = {
        ...whereFilter,
        startingPrice: MoreThanOrEqual(minPrice),
      };
    } else if (maxPrice) {
      whereFilter = {
        ...whereFilter,
        startingPrice: LessThanOrEqual(maxPrice),
      };
    }

    const [data, total] = await this.auctions.findAndCount({
      where: whereFilter,
      order: { endDate: 'ASC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string): Promise<Auction> {
    const auction = await this.auctions.findOneBy({ id });
    if (!auction) {
      throw new NotFoundException(`Auction with ID ${id} not found.`);
    }
    return auction;
  }

  remove(id: string, _user: User) {
    return `This action removes a #${id} auction`;
  }
}

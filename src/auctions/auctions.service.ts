import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;
const THREE_DAYS_IN_MS = 3 * ONE_DAY_IN_MS;

@Injectable()
export class AuctionsService {
  constructor(
    @InjectRepository(Auction)
    private readonly auctions: Repository<Auction>,
  ) {}

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
      relations: {
        seller: true,
      },
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
    const auction = await this.auctions.findOne({
      where: { id },
      relations: {
        seller: true,
      },
    });
    if (!auction) {
      throw new NotFoundException(`Auction with ID ${id} not found.`);
    }
    return auction;
  }

  async create(auctionPayload: CreateAuctionDto, user: User) {
    const createdAt = new Date();
    const endDate =
      auctionPayload.endDate ??
      new Date(createdAt.getTime() + THREE_DAYS_IN_MS);

    if (endDate.getTime() < createdAt.getTime()) {
      throw new ConflictException('Auction end cannot be in the past.');
    }

    if (endDate.getTime() < createdAt.getTime() + ONE_DAY_IN_MS) {
      throw new ConflictException('Auction has to last at least one day.');
    }

    const newAuction = this.auctions.create({
      ...auctionPayload,
      createdAt,
      seller: user,
      endDate,
    });
    return this.auctions.save(newAuction);
  }

  async remove(auctionId: string, user: User) {
    const auction = await this.auctions.findOne({
      where: { id: auctionId },
      relations: { seller: true },
    });

    if (!auction) {
      throw new NotFoundException(`Auction with ID ${auctionId} not found.`);
    }

    if (auction.seller.id !== user.id) {
      throw new ConflictException(`You can only delete your own auctions.`);
    }

    if (auction.endDate.getTime() <= new Date().getTime()) {
      throw new ConflictException(
        'Auctions that have already ended cannot be deleted.',
      );
    }

    if (new Date().getTime() > auction.endDate.getTime() - ONE_DAY_IN_MS) {
      throw new ConflictException(
        'Cannot delete auction within one day of auction end.',
      );
    }

    const result = await this.auctions.delete(auctionId);

    if ((result.affected ?? 0) < 1) {
      throw new ConflictException(
        `Auction with ID ${auctionId} could not be deleted.`,
      );
    }

    return result;
  }
}

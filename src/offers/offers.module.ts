import { Module } from '@nestjs/common';
import { OffersService } from './offers.service';
import { OffersController } from './offers.controller';
import { Offer } from './entities/offer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auction } from '../auctions/entities/auction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Offer, Auction])],
  controllers: [OffersController],
  providers: [OffersService],
  exports: [OffersService, TypeOrmModule],
})
export class OffersModule {}

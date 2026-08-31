import { Module } from '@nestjs/common';
import { AuctionsService } from './auctions.service';
import { AuctionsController } from './auctions.controller';
import { Auction } from './entities/auction.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OffersModule } from '../offers/offers.module';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Auction, User]), OffersModule],
  controllers: [AuctionsController],
  providers: [AuctionsService],
  exports: [AuctionsService, TypeOrmModule],
})
export class AuctionsModule {}

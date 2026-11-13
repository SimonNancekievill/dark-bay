import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Auction } from "@/auctions/entities/auction.entity";

import { Offer } from "./entities/offer.entity";
import { OffersController } from "./offers.controller";
import { OffersService } from "./offers.service";

@Module({
	imports: [TypeOrmModule.forFeature([Offer, Auction])],
	controllers: [OffersController],
	providers: [OffersService],
	exports: [OffersService, TypeOrmModule],
})
export class OffersModule {}

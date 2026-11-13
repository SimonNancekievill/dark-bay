import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AuctionsModule } from "./auctions/auctions.module";
import { Auction } from "./auctions/entities/auction.entity";
import { AuthModule } from "./auth/auth.module";
import { JwtAuthGuard } from "./auth/jwtAuth.guard";
import { Offer } from "./offers/entities/offer.entity";
import { OffersModule } from "./offers/offers.module";
import { User } from "./users/entities/user.entity";
import { UsersModule } from "./users/users.module";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		TypeOrmModule.forRootAsync({
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => ({
				type: "postgres",
				url: configService.getOrThrow<string>("POSTGRES_URL"),
				entities: [Auction, Offer, User],
				synchronize: true,
				logging: false,
			}),
		}),
		AuctionsModule,
		OffersModule,
		AuthModule,
		UsersModule,
	],
	providers: [{ provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class AppModule {}

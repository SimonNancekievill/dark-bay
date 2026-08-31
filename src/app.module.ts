import { Module } from '@nestjs/common';
import { AuctionsModule } from './auctions/auctions.module';
import { OffersModule } from './offers/offers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auction } from './auctions/entities/auction.entity';
import { Offer } from './offers/entities/offer.entity';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwtAuth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'better-sqlite3',
        database: configService.getOrThrow<string>('DB_FILE'),
        entities: [Auction, Offer, User],
        synchronize: true,
        logging: false,
        enableWAL: true,
        statementCacheSize: 100,
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

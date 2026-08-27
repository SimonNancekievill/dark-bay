import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuctionsModule } from './auctions/auctions.module';
import { OffersModule } from './offers/offers.module';

@Module({
  imports: [AuctionsModule, OffersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Expose, Type } from 'class-transformer';

export class OfferResponseDto {
  @Expose()
  id!: string;

  @Expose()
  bidder!: string;

  @Expose()
  offerPrice!: number;

  @Expose()
  auctionId!: string;

  @Expose()
  @Type(() => Date)
  createdAt!: Date;
}

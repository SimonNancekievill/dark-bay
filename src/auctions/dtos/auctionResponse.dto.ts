import { Expose, Type } from 'class-transformer';

export class AuctionResponseDto {
  @Expose()
  id!: string;

  @Expose()
  title!: string;

  @Expose()
  description!: string;

  @Expose()
  seller!: string;

  @Expose()
  startingPrice!: number;

  @Expose()
  @Type(() => Date)
  createdAt!: Date;

  @Expose()
  @Type(() => Date)
  endDate!: Date;
}

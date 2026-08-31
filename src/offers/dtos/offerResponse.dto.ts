import { Expose, Type } from 'class-transformer';
import { UserResponseDto } from '../../users/dtos/userResponse.dto';

export class OfferResponseDto {
  @Expose()
  id!: string;

  @Expose()
  @Type(() => UserResponseDto)
  bidder!: UserResponseDto;

  @Expose()
  offerPrice!: number;

  @Expose()
  auctionId!: string;

  @Expose()
  @Type(() => Date)
  createdAt!: Date;
}

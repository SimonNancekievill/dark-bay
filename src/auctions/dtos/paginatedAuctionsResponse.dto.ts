import { Expose, Type } from 'class-transformer';
import { PaginationMetaResponseDto } from '../../common/dtos/paginationMetaResponse.dto';
import { AuctionResponseDto } from './auctionResponse.dto';

export class PaginatedAuctionsResponseDto {
  @Expose()
  @Type(() => AuctionResponseDto)
  data!: AuctionResponseDto[];

  @Expose()
  @Type(() => PaginationMetaResponseDto)
  meta!: PaginationMetaResponseDto;
}

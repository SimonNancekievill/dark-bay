import { Expose, Type } from "class-transformer";

import { AuctionResponseDto } from "./auctionResponse.dto";
import { PaginationMetaResponseDto } from "../../common/dtos/paginationMetaResponse.dto";

export class PaginatedAuctionsResponseDto {
	@Expose()
	@Type(() => AuctionResponseDto)
	data!: AuctionResponseDto[];

	@Expose()
	@Type(() => PaginationMetaResponseDto)
	meta!: PaginationMetaResponseDto;
}

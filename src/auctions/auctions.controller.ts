import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	ParseUUIDPipe,
	Patch,
	Post,
	Query,
	Request,
	SerializeOptions,
} from "@nestjs/common";

import type { AuthenticatedRequest } from "@/auth/login.type";
import { Public } from "@/common/decorators/public.decorator";
import { PaginationQueryDto } from "@/common/dtos/paginationQuery.dto";
import { CreateOfferDto } from "@/offers/dtos/createOffer.dto";
import { OfferResponseDto } from "@/offers/dtos/offerResponse.dto";
import { OffersService } from "@/offers/offers.service";

import { AuctionsService } from "./auctions.service";
import { AuctionResponseDto } from "./dtos/auctionResponse.dto";
import { CreateAuctionDto } from "./dtos/createAuction.dto";
import { PaginatedAuctionsResponseDto } from "./dtos/paginatedAuctionsResponse.dto";
import { UpdateAuctionDto } from "./dtos/updateAuction.dto";

@Controller("auctions")
export class AuctionsController {
	constructor(
		private readonly auctionsService: AuctionsService,
		private readonly offersService: OffersService,
	) {}

	@Public()
	@Get()
	@SerializeOptions({ type: PaginatedAuctionsResponseDto })
	findAll(@Query() pagination: PaginationQueryDto) {
		return this.auctionsService.findAll(pagination);
	}

	@Public()
	@Get(":id")
	@SerializeOptions({ type: AuctionResponseDto })
	findOne(@Param("id", ParseUUIDPipe) id: string) {
		return this.auctionsService.findOne(id);
	}

	@Public()
	@Get(":id/offers")
	@SerializeOptions({ type: OfferResponseDto })
	findAllOffers(@Param("id", ParseUUIDPipe) id: string) {
		return this.offersService.findAll(id);
	}

	@Post()
	@SerializeOptions({ type: AuctionResponseDto })
	create(@Body() auctionPayload: CreateAuctionDto, @Request() req: AuthenticatedRequest) {
		return this.auctionsService.create(auctionPayload, req.user);
	}

	@Post(":id/offer")
	@SerializeOptions({ type: OfferResponseDto })
	createOffer(
		@Param("id", ParseUUIDPipe) id: string,
		@Body() offerPayload: CreateOfferDto,
		@Request() req: AuthenticatedRequest,
	) {
		return this.offersService.create(id, offerPayload, req.user);
	}

	@Patch(":id")
	@SerializeOptions({ type: AuctionResponseDto })
	update(
		@Param("id", ParseUUIDPipe) id: string,
		@Body() auctionPayload: UpdateAuctionDto,
		@Request() req: AuthenticatedRequest,
	) {
		return this.auctionsService.update(id, auctionPayload, req.user);
	}

	@Delete(":id")
	@HttpCode(HttpStatus.NO_CONTENT)
	remove(@Param("id", ParseUUIDPipe) id: string, @Request() req: AuthenticatedRequest) {
		return this.auctionsService.remove(id, req.user);
	}
}

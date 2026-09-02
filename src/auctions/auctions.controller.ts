import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  SerializeOptions,
  Query,
  Request,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuctionsService } from './auctions.service';
import { CreateAuctionDto } from './dtos/createAuction.dto';
import { AuctionResponseDto } from './dtos/auctionResponse.dto';
import { OfferResponseDto } from '../offers/dtos/offerResponse.dto';
import { CreateOfferDto } from '../offers/dtos/createOffer.dto';
import { OffersService } from '../offers/offers.service';
import { PaginationQueryDto } from '../common/dtos/paginationQuery.dto';
import { PaginatedAuctionsResponseDto } from './dtos/paginatedAuctionsResponse.dto';
import { Public } from '../common/decorators/public.decorator';
import type { AuthenticatedRequest } from '../auth/login.type';

@Controller('auctions')
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
  @Get(':id')
  @SerializeOptions({ type: AuctionResponseDto })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.auctionsService.findOne(id);
  }

  @Public()
  @Get(':id/offers')
  @SerializeOptions({ type: OfferResponseDto })
  findAllOffers(@Param('id', ParseUUIDPipe) id: string) {
    return this.offersService.findAll(id);
  }

  @Post()
  @SerializeOptions({ type: AuctionResponseDto })
  create(
    @Body() auctionPayload: CreateAuctionDto,
    @Request() req: AuthenticatedRequest,
  ) {
    return this.auctionsService.create(auctionPayload, req.user);
  }

  @Post(':id/offer')
  @SerializeOptions({ type: OfferResponseDto })
  createOffer(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() createOfferDto: CreateOfferDto,
    @Request() req: AuthenticatedRequest,
  ) {
    return this.offersService.create(id, createOfferDto, req.user);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @Param('id', ParseUUIDPipe) id: string,
    @Request() req: AuthenticatedRequest,
  ) {
    return this.auctionsService.remove(id, req.user);
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  SerializeOptions,
  Query,
  Request,
} from '@nestjs/common';
import { AuctionsService } from './auctions.service';
import { CreateAuctionDto } from './dtos/createAuction.dto';
import { UpdateAuctionDto } from './dtos/updateAuction.dto';
import { AuctionResponseDto } from './dtos/auctionResponse.dto';
import { OfferResponseDto } from '../offers/dtos/offerResponse.dto';
import { CreateOfferDto } from '../offers/dtos/createOffer.dto';
import { OffersService } from '../offers/offers.service';
import { PaginationQueryDto } from '../common/dtos/paginationQuery.dto';
import { PaginatedAuctionsResponseDto } from './dtos/paginatedAuctionsResponse.dto';
import { Public } from '../common/decorators/public.decorator';
import { User } from '../users/entities/user.entity';
import { Request as ExpressRequest } from 'express';

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
    @Request() req: ExpressRequest & { user: User },
  ) {
    return this.auctionsService.create(auctionPayload, req.user);
  }

  @Post(':id/offer')
  @SerializeOptions({ type: OfferResponseDto })
  createOffer(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() createOfferDto: CreateOfferDto,
    @Request() req: ExpressRequest & { user: User },
  ) {
    return this.offersService.create(id, createOfferDto, req.user);
  }

  // @Patch(':id')
  // @SerializeOptions({ type: AuctionResponseDto })
  // update(
  //   @Param('id', ParseUUIDPipe) id: string,
  //   @Body() updateAuctionDto: UpdateAuctionDto,
  //   @Request() req: ExpressRequest & { user: User },
  // ) {
  //   return this.auctionsService.update(id, updateAuctionDto, req.user);
  // }

  @Delete(':id')
  remove(
    @Param('id', ParseUUIDPipe) id: string,
    @Request() req: ExpressRequest & { user: User },
  ) {
    return this.auctionsService.remove(id, req.user);
  }
}

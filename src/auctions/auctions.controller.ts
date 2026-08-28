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
} from '@nestjs/common';
import { AuctionsService } from './auctions.service';
import { CreateAuctionDto } from './dtos/createAuction.dto';
import { UpdateAuctionDto } from './dtos/updateAuction.dto';
import { AuctionResponseDto } from './dtos/auctionResponse.dto';
import { OfferResponseDto } from '../offers/dtos/offerResponse.dto';
import { CreateOfferDto } from '../offers/dtos/createOffer.dto';
import { OffersService } from '../offers/offers.service';
import { PaginationQueryDto } from '../common/dtos/paginationQueryDto.dto';

@Controller('auctions')
export class AuctionsController {
  constructor(
    private readonly auctionsService: AuctionsService,
    private readonly offersService: OffersService,
  ) {}

  @Get()
  @SerializeOptions({ type: AuctionResponseDto })
  findAll(@Query() pagination: PaginationQueryDto) {
    return this.auctionsService.findAll(pagination);
  }

  @Get(':id')
  @SerializeOptions({ type: AuctionResponseDto })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.auctionsService.findOne(id);
  }

  @Get(':id/offers')
  @SerializeOptions({ type: OfferResponseDto })
  findAllOffers(@Param('id', ParseUUIDPipe) id: string) {
    return this.offersService.findAll(id);
  }

  @Post()
  @SerializeOptions({ type: AuctionResponseDto })
  create(@Body() auctionPayload: CreateAuctionDto) {
    return this.auctionsService.create(auctionPayload);
  }

  @Post(':id/offer')
  @SerializeOptions({ type: OfferResponseDto })
  createOffer(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() createOfferDto: CreateOfferDto,
  ) {
    return this.offersService.create(id, createOfferDto);
  }

  @Patch(':id')
  @SerializeOptions({ type: AuctionResponseDto })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAuctionDto: UpdateAuctionDto,
  ) {
    return this.auctionsService.update(id, updateAuctionDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.auctionsService.remove(id);
  }
}

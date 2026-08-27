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
} from '@nestjs/common';
import { AuctionsService } from './auctions.service';
import { CreateAuctionDto } from './dto/createAuction.dto';
import { UpdateAuctionDto } from './dto/updateAuction.dto';
import { AuctionResponseDto } from './dto/auctionResponse.dto';

@Controller('auctions')
export class AuctionsController {
  constructor(private readonly auctionsService: AuctionsService) {}

  @Post()
  @SerializeOptions({ type: AuctionResponseDto })
  create(@Body() auctionPayload: CreateAuctionDto) {
    return this.auctionsService.create(auctionPayload);
  }

  @Get()
  @SerializeOptions({ type: AuctionResponseDto })
  findAll() {
    return this.auctionsService.findAll();
  }

  @Get(':id')
  @SerializeOptions({ type: AuctionResponseDto })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.auctionsService.findOne(id);
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

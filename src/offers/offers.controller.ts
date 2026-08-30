import {
  Controller,
  Get,
  Param,
  Delete,
  Request,
  ParseUUIDPipe,
} from '@nestjs/common';
import { OffersService } from './offers.service';
import type { AuthenticatedRequest } from '../auth/login.type';

@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.offersService.findOne(id);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseUUIDPipe) id: string,
    @Request() req: AuthenticatedRequest,
  ) {
    return this.offersService.remove(id, req.user);
  }
}

import {
  Controller,
  Param,
  Delete,
  Request,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { OffersService } from './offers.service';
import type { AuthenticatedRequest } from '../auth/login.type';

@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @Param('id', ParseUUIDPipe) id: string,
    @Request() req: AuthenticatedRequest,
  ) {
    return this.offersService.remove(id, req.user);
  }
}

import { PartialType } from '@nestjs/mapped-types';
import { CreateOfferDto } from './createOffer.dto';

export class UpdateOfferDto extends PartialType(CreateOfferDto) {}

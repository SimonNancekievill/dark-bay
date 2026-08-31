import { IsNumber, Min } from 'class-validator';

export class CreateOfferDto {
  @IsNumber()
  @Min(1)
  offerPrice!: number;
}

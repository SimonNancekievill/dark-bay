import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateOfferDto {
  @IsString()
  @IsNotEmpty()
  bidder!: string;

  @IsNumber()
  @Min(1)
  offerPrice!: number;
}

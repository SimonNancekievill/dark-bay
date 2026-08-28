import { Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, Max, Min } from 'class-validator';

export class PaginationQueryDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  page: number = 1;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  @Type(() => Number)
  limit: number = 10;

  @IsOptional()
  @IsIn(['open', 'closed'])
  status!: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  'min-price'!: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  'max-price'!: number;
}

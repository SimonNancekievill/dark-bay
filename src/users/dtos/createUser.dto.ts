import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  username!: string;

  @IsString()
  @MinLength(10)
  @MaxLength(64)
  password!: string;
}

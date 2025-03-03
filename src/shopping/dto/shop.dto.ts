import { IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';

export class createShopping {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsString()
  image: string;
}

export class updateShopping {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsString()
  image?: string;
}

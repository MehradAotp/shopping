import { IsNotEmpty, IsString } from 'class-validator';

export class loginUserOutputDto {
  @IsNotEmpty()
  @IsString()
  message: string;
  @IsNotEmpty()
  access_token: string;
}

export class loginInputDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

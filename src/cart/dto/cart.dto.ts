import { ShoppingOutput } from '../../shopping/dto/shop-output.dto';

export class CartDto {
  shoppingId: string;
}

export class ClearCartDto {
  userId: string;
}

export class CartOutputDto {
  items: CartItemDto[];
}

export class CartItemDto {
  shoppingId: ShoppingOutput;
  quantity: number;
}

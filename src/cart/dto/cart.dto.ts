import { ShoppingOutput } from '../../shopping/dto/shop-output.dto';

export class CartDto {
  userId: string;
  shoppingId: string;
}
export class ClearCartDto {
  userId: string;
}
export class CartOutputDto {
  userId: string;
  items: CartItemDto[];
}
export class CartItemDto {
  shoppingId: ShoppingOutput;
  quantity: number;
}

import { Controller, Post, Get, Delete, Param, Body } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartDto, ClearCartDto } from './dto/cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add')
  async addToCart(@Body() data: CartDto) {
    return this.cartService.addToCart(data.userId, data.shoppingId);
  }

  @Get(':userId')
  async getCart(@Param('userId') userId: string) {
    return this.cartService.getCart(userId);
  }

  @Delete('remove')
  async removeFromCart(@Body() data: CartDto) {
    return this.cartService.removeFromCart(data.userId, data.shoppingId);
  }

  @Post('increment')
  async incrementCartItem(@Body() body: CartDto) {
    return this.cartService.incrementCartItem(body.userId, body.shoppingId);
  }

  @Post('decrement')
  async decrementCartItem(@Body() body: CartDto) {
    return this.cartService.decrementCartItem(body.userId, body.shoppingId);
  }

  @Delete('clear')
  async clearCart(@Body() body: ClearCartDto) {
    return this.cartService.clearCart(body);
  }
}

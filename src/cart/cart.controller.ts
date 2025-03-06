import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CartDto } from './dto/cart.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('cart')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add')
  async addToCart(@Body() data: CartDto, @Req() req: Request) {
    const userId = req.user['id'];
    return this.cartService.addToCart(userId, data.shoppingId);
  }

  @Get()
  async getCart(@Req() req: Request) {
    const userId = req.user['id'];
    return this.cartService.getCart(userId);
  }

  @Delete('remove')
  async removeFromCart(@Body() data: CartDto, @Req() req: Request) {
    const userId = req.user['id'];
    return this.cartService.removeFromCart(userId, data.shoppingId);
  }

  @Post('increment')
  async incrementCartItem(@Body() body: CartDto, @Req() req: Request) {
    const userId = req.user['id'];
    return this.cartService.incrementCartItem(userId, body.shoppingId);
  }

  @Post('decrement')
  async decrementCartItem(@Body() body: CartDto, @Req() req: Request) {
    const userId = req.user['id'];
    return this.cartService.decrementCartItem(userId, body.shoppingId);
  }

  @Delete('clear')
  async clearCart(@Req() req: Request) {
    const userId = req.user['id'];
    return this.cartService.clearCart({ userId });
  }
}

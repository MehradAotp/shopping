import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ShoppingService } from './shopping.service';
import { buyShoppingOutput, ShoppingOutput } from './dto/shop-output.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Shopping')
@ApiBearerAuth()
@Controller('shopping')
export class ShoppingController {
  constructor(private readonly shoppingService: ShoppingService) {}

  @Get()
  async findAll(): Promise<ShoppingOutput[]> {
    return this.shoppingService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ShoppingOutput> {
    return this.shoppingService.findOne(id);
  }

  @Post('buy')
  @UseGuards(JwtAuthGuard)
  async buy(): Promise<buyShoppingOutput> {
    return this.shoppingService.buy();
  }
}

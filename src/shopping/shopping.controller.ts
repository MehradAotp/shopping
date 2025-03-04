import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ShoppingService } from './shopping.service';
import { buyShoppingOutput, ShoppingOutput } from './dto/shop-output.dto';
import { createShopping, updateShopping } from './dto/shop.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Shopping')
@ApiBearerAuth()
@Controller('shopping')
export class ShoppingController {
  constructor(private readonly shoppingService: ShoppingService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() shopping: createShopping): Promise<ShoppingOutput> {
    return this.shoppingService.create(shopping);
  }

  @Get()
  async findAll(): Promise<ShoppingOutput[]> {
    return this.shoppingService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ShoppingOutput> {
    return this.shoppingService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() shopping: updateShopping,
  ): Promise<ShoppingOutput> {
    return this.shoppingService.update(id, shopping);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: string): Promise<void> {
    return this.shoppingService.delete(id);
  }

  @Post('buy')
  @UseGuards(JwtAuthGuard)
  async buy(): Promise<buyShoppingOutput> {
    return this.shoppingService.buy();
  }
}

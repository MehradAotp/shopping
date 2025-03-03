import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ShoppingService } from './shopping.service';
import { ShoppingOutput } from './dto/shop-output.dto';
import { createShopping, updateShopping } from './dto/shop.dto';

@Controller('shopping')
export class ShoppingController {
  constructor(private readonly shoppingService: ShoppingService) {}

  @Post()
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
  async update(
    @Param('id') id: string,
    @Body() shopping: updateShopping,
  ): Promise<ShoppingOutput> {
    return this.shoppingService.update(id, shopping);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.shoppingService.delete(id);
  }
}

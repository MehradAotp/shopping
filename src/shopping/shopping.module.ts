import { Module } from '@nestjs/common';
import { ShoppingService } from './shopping.service';
import { ShoppingController } from './shopping.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Shopping, ShoppingSchema } from './database/model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Shopping.name, schema: ShoppingSchema },
    ]),
  ],
  providers: [ShoppingService],
  controllers: [ShoppingController],
})
export class ShoppingModule {}

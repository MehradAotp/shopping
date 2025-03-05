import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Shopping } from './database/model';
import { buyShoppingOutput, ShoppingOutput } from './dto/shop-output.dto';

@Injectable()
export class ShoppingService {
  constructor(
    @InjectModel(Shopping.name) private shoppingModel: Model<Shopping>,
  ) {}

  async findAll(): Promise<ShoppingOutput[]> {
    const shopping = await this.shoppingModel.find();
    return shopping.map(this.docToDto);
  }

  async findOne(id: string): Promise<ShoppingOutput> {
    const shopping = await this.shoppingModel.findById(id);
    return this.docToDto(shopping);
  }

  async buy(): Promise<buyShoppingOutput> {
    return { message: 'پرداخت با موفقیت انجام شد 🎉' };
  }

  private docToDto(doc: Shopping): ShoppingOutput {
    return {
      _id: doc._id.toString(),
      name: doc.name,
      price: doc.price,
      image: doc.image,
    };
  }
}

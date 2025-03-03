import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Shopping } from './database/model';
import { ShoppingOutput } from './dto/shop-output.dto';
import { createShopping, updateShopping } from './dto/shop.dto';

@Injectable()
export class ShoppingService {
  constructor(
    @InjectModel(Shopping.name) private shoppingModel: Model<Shopping>,
  ) {}

  async create(shopping: createShopping): Promise<ShoppingOutput> {
    const newShopping = new this.shoppingModel(shopping);

    const savedShopping = await newShopping.save();
    return this.docToDto(savedShopping);
  }

  async findAll(): Promise<ShoppingOutput[]> {
    const shopping = await this.shoppingModel.find();
    return shopping.map(this.docToDto);
  }

  async findOne(id: string): Promise<ShoppingOutput> {
    const shopping = await this.shoppingModel.findById(id);
    return this.docToDto(shopping);
  }

  async update(id: string, shopping: updateShopping): Promise<ShoppingOutput> {
    const updatedShopping = await this.shoppingModel.findByIdAndUpdate(
      id,
      shopping,
    );
    return this.docToDto(updatedShopping);
  }

  async delete(id: string): Promise<void> {
    await this.shoppingModel.findByIdAndDelete(id);
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

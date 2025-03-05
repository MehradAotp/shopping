import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Cart } from './database/model';
import { ClearCartDto } from './dto/cart.dto';
import { ShoppingOutput } from '../shopping/dto/shop-output.dto';
import { CartOutputDto } from './dto/cart.dto';
import { Shopping } from 'src/shopping/database/model';

@Injectable()
export class CartService {
  constructor(@InjectModel(Cart.name) private cartModel: Model<Cart>) {}

  async getCart(userId: string): Promise<CartOutputDto> {
    const cart = await this.cartModel
      .findOne({ userId })
      .populate('items.shoppingId')
      .lean();

    if (!cart) {
      return { userId, items: [] };
    }
    return this.docToDto(cart);
  }

  async addToCart(userId: string, shoppingId: string) {
    let cart = await this.cartModel.findOne({ userId });

    if (!cart) {
      cart = new this.cartModel({ userId, items: [] });
    }

    const existingItem = cart.items.find(
      (item) => item.shoppingId.toString() === shoppingId,
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.items.push({
        shoppingId: new Types.ObjectId(shoppingId),
        quantity: 1,
      });
    }

    await cart.save();

    return cart;
  }

  async removeFromCart(userId: string, shoppingId: string) {
    const cart = await this.cartModel.findOne({ userId });

    if (!cart) {
      throw new NotFoundException('Cart Not Found');
    }

    cart.items = cart.items.filter(
      (item) => item.shoppingId.toString() !== shoppingId,
    );

    await cart.save();

    return cart;
  }
  async incrementCartItem(userId: string, shoppingId: string) {
    const cart = await this.cartModel.findOne({ userId });

    if (!cart) {
      throw new NotFoundException('Cart Not Found');
    }

    const item = cart.items.find(
      (item) => item.shoppingId.toString() === shoppingId,
    );
    if (!item) {
      throw new NotFoundException('Item Not Found in Cart');
    }

    item.quantity += 1;
    await cart.save();

    return cart;
  }

  async decrementCartItem(userId: string, shoppingId: string) {
    const cart = await this.cartModel.findOne({ userId });

    if (!cart) {
      throw new NotFoundException('Cart Not Found');
    }

    const item = cart.items.find(
      (item) => item.shoppingId.toString() === shoppingId,
    );
    if (!item) {
      throw new NotFoundException('Item Not Found in Cart');
    }

    if (item.quantity > 1) {
      item.quantity -= 1;
    } else {
      cart.items = cart.items.filter(
        (itemProduct) => itemProduct.shoppingId.toString() !== shoppingId,
      );
    }

    await cart.save();

    return cart;
  }

  async clearCart(data: ClearCartDto) {
    await this.cartModel.deleteOne({ userId: data.userId });
  }

  private shoppingToOutputDto(
    shopping: Shopping | Types.ObjectId,
  ): ShoppingOutput {
    if (shopping instanceof Types.ObjectId) {
      return {
        _id: shopping.toString(),
        name: '',
        price: 0,
        image: '',
      };
    }

    return {
      _id: shopping._id.toString(),
      name: shopping.name,
      price: shopping.price,
      image: shopping.image,
    };
  }

  private docToDto(
    doc: Cart & { items: Array<{ shoppingId: Shopping | Types.ObjectId }> },
  ): CartOutputDto {
    return {
      userId: doc.userId,
      items: doc.items.map((item) => ({
        shoppingId: this.shoppingToOutputDto(item.shoppingId),
        quantity: item.quantity,
      })),
    };
  }
}

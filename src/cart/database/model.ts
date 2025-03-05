import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class CartItem {
  @Prop({ type: Types.ObjectId, ref: 'Shopping', required: true })
  shoppingId: Types.ObjectId;

  @Prop({ default: 1 })
  quantity: number;
}

export const CartItemSchema = SchemaFactory.createForClass(CartItem);

@Schema()
export class Cart extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ type: [CartItemSchema], default: [] })
  items: CartItem[];
}

export const CartSchema = SchemaFactory.createForClass(Cart);

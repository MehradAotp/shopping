import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Shopping extends Document {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: Number, required: true })
  price: number;

  @Prop({ type: String, required: true })
  image: string;
}

export const ShoppingSchema = SchemaFactory.createForClass(Shopping);

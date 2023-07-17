import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, now } from 'mongoose';
import { ObjectId } from 'bson';

import { INews } from '@trnx/news/common';

export type NewsDocument = HydratedDocument<News>;

@Schema({
  collection: 'news',
  timestamps: true,
})
export class News implements INews {
  @Prop({ type: SchemaTypes.ObjectId, default: new ObjectId().toString() })
  _id: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ default: 0 })
  views: number;

  @Prop({ default: now() })
  createdAt: Date;

  @Prop({ default: now() })
  updatedAt: Date;
}

export const NewsSchema = SchemaFactory.createForClass(News);

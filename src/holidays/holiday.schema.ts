import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type HolidayDocument = Holiday & Document;

@Schema({
  timestamps: true,
})
export class Holiday {
  @Prop({
    index: true,
  })
  date: Date;

  @Prop()
  description: string;
}

export const HolidaySchema = SchemaFactory.createForClass(Holiday);

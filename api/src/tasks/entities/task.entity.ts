import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { UserType } from 'src/enums/user-type/user-type.enum';
import { User } from 'src/users';

@Schema({ timestamps: true })
export class Task extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({
    type: [MongooseSchema.Types.ObjectId],
    ref: 'User',
    default: [],
  })
  assigned: User[];

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'User',
    default: '',
  })
  created: User;

  @Prop({ type: Date, required: true })
  startDate: Date;

  @Prop({ type: Date, required: true })
  endDate: Date;

  @Prop({ default: false })
  deleted: boolean;
}

export const TaskSchema = SchemaFactory.createForClass(Task);

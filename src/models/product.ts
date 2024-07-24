import mongoose, { Document, model, Schema } from 'mongoose'

export interface IProduct extends Document {
   _seller: mongoose.Schema.Types.ObjectId;
   _category: mongoose.Schema.Types.ObjectId;
   name: string;
   price: number;
   image?: string;
   description?: string;
}

const ProductSchema: Schema = new Schema({
   _seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true
   },
   _category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'category'
   },
   name: {
      type: String,
      required: true
   },
   price: {
      type: Number,
      required: true,
   },
   image: {
      type: String,
   },
   description: {
      type: String,
   }
},
   {
      timestamps: true,
      versionKey: false
   })

export const Product = model<IProduct>("product", ProductSchema)
import mongoose, { model, Schema, Document } from 'mongoose'

export interface IProducAnalytics extends Document {
   _product: mongoose.Schema.Types.ObjectId;
   view: number;
   clicks: number
   totalPurcheses: number;
}

const ProductAnalyticsSchema: Schema = new Schema({
   _product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'product',
      required: true
   },
   view: {
      type: Number
   },
   clicks: {
      type: Number
   },
   totalPurcheses: {
      type: Number
   }
}, {
   timestamps: true,
   versionKey: false
})

export const ProductAnalytics = model<IProducAnalytics>('product_analytics', ProductAnalyticsSchema)
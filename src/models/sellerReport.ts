import mongoose, { model, Schema } from 'mongoose'

export interface ISellerReport extends Document {
   _seller: mongoose.Schema.Types.ObjectId;
   totalSales?: number;
   totalOrders?: number;
   totalRevenue?: number;
}

const SellerReportSchema: Schema = new Schema({
   _seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true
   },
   totalSales: {
      type: Number
   },
   totalOrders: {
      type: Number
   },
   totalRevenue: {
      type: Number
   }
}, {
   timestamps: true,
   versionKey: false
})

export const SellerReport = model<ISellerReport>('seller_report', SellerReportSchema)
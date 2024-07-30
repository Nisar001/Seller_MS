import { Schema, model, Document } from 'mongoose';

interface IStore extends Document {
   userId: Schema.Types.ObjectId;
   storeName: string;
   storeDescription?: string;
   GSTN: number;
   LICN: number;
   storeAddress?: [object];
}

const StoreSchema = new Schema<IStore>({
   userId: {
      type: Schema.Types.ObjectId,
      ref: 'seller',
      required: true
   },
   storeName: {
      type: String,
      required: true
   },
   storeDescription: {
      type: String,
      required: true
   },
   GSTN: {
      type: Number,
      required: true
   },
   LICN: {
      type: Number,
      required: true
   },
   storeAddress: [
      {
         street: {
            type: String,
         },
         area: {
            type: String,
         },
         city: {
            type: String,
         },
         zipcode: {
            type: String,
         },
         state: {
            type: String,
         },
         country: {
            type: String,
         },
      },
   ],
}, {
   timestamps: true,
   versionKey: false
});

export const Store = model<IStore>('store', StoreSchema);

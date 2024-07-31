import { Request, Response } from "express";
import { Seller } from "../../../models/seller";
import { Store } from './../../../models/sellerStore';

export const createStore = async (req: Request, res: Response) => {
   try {
      const { _id } = req.user
      const { storeName, storeDescription, storeAddress, GSTN, LICN, } = req.body;
      const seller = await Seller.findById(_id)
      if (!seller) {
         return res.status(401).json({ message: 'Invalid User, You cannot create store... ' })
      }
      const isNonEmptyString = (field: any) => typeof field === 'string' && field.trim() !== '';

      const hasEmptyFields = (obj: any) => {
         return Object.values(obj).some(field => !isNonEmptyString(field));
      };

      if (
         !isNonEmptyString(storeName) ||
         !isNonEmptyString(storeDescription) ||
         !Array.isArray(storeAddress) ||
         storeAddress.some(hasEmptyFields)
      ) {
         return res.status(400).json({ error: 'Field cannot be empty' });
      }
      const existingStore = await Store.findOne({ storeName: storeName })
      if (existingStore) {
         return res.status(400).json({ message: 'Store is already exist...' })
      }
      const gst = await Store.findOne({ GSTN }) // check GST and Licence number 
      if (gst) {
         return res.status(400).json({ message: "GST Number should  be unique" })
      }
      const store = await Store.create({
         userId: seller._id,
         storeName: storeName,
         storeDescription: storeDescription,
         storeAddress: storeAddress,
         GSTN: GSTN,
         LICN: LICN

      })
      return res.status(201).json({ message: 'Store Created', store })
   } catch (error) {
      return res.status(500).json({ error: error.message })
   }
}
import { Request, Response } from "express";
import { Seller } from "../../../models/seller";
import { Store } from './../../../models/sellerStore';

export const createStore = async (req: Request, res: Response) => {
   try {
      const { _id } = req.user
      const { storename, storeDescription, storeAddress, GSTN, LICN, } = req.body;
      const seller = await Seller.findById(_id)
      if (!seller) {
         return res.status(401).json({ message: 'Invalid User, You cannot create store... ' })
      }
      if ([storename, storeDescription, storeAddress].some((field: string) => field.trim() === '')) {
         return res.status(400).json({ error: 'Field cannot be empty' })
      }
      const existingStore = await Store.findOne({ storename: storename })
      if (existingStore) {
         return res.status(400).json({ message: 'Store is already exist...' })
      }
      const store = await Store.create({
         _userId: seller._id,
         storename: storename,
         storeDescription: storeDescription,
         storeAddress: storeAddress,
         GSTN: GSTN,
         LICN: LICN

      })
      return res.status(201).json({ message: 'Category Created', store })
   } catch (error) {
      return res.status(500).json({ error: error.message })
   }
}
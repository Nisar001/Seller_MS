import { Request, Response } from "express";
import { Store } from "../../../models/sellerStore";
import { Seller } from "../../../models/seller";
import { IStore } from './../../../models/sellerStore';

export const updateStore = async (req: Request, res: Response) => {
   try {
      const { _id } = req.user;
      const { _storeId } = req.query
      const seller = await Seller.findById(_id)
      if (!seller) {
         return res.status(401).json({ message: 'Invalid User, You cannot create store... ' })
      }
      const { storeName, storeDescription, storeAddress } = req.body as IStore;
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
      const store = await Store.findById({ _id: _storeId })

      if (storeName || storeDescription || storeAddress) {
         store.storeName = storeName
         store.storeAddress = storeAddress
         store.storeDescription = storeDescription
         await store.save()
         return res.status(200).json({
            message: 'Store Updated...', store: {
               store: store
            }
         })
      } else
         return res.status(400).json({ message: 'Please Provide some field to update' })

   } catch (error) {
      return res.status(500).json({ error: error.message })
   }
}
import { Request, Response } from 'express'
import { createBundle } from './bundleController'
import { Product } from '../../../models/product';

export const createBundleProductSale = async (req: Request, res: Response) => {
   try {
      const { _id } = req.user;
      if (!_id) {
         return res.status(401).json({ message: 'Unauthorized Access' })
      }
      const bundleData = req.body;

      const products = await Product.findOne({ _seller: _id })
      if (!products) {
         return res.status(401).json({ message: "You have not access to add other's product in bundle" })
      }
      const bundle = await createBundle(bundleData);
      return res.status(201).json({ success: true, message: "Bundle Created Successfully", bundle });
   } catch (error) {
      return res.status(500).json({ message: error.message });
   }
}
import { Request, Response } from "express";
import { Product } from '../../../models/product';

export const getProduct = async (req: Request, res: Response) => {
   try {
      const { _id } = req.user;
      const product = await Product.findById(_id)
      if (!product) {
         return res.status(404).json({ message: 'Product Not Found' })
      }
      return res.status(200).json({ product: product })
   } catch (error) {
      return res.status(500).json({ error: error.message })
   }
}
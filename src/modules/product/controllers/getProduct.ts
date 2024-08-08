import { Request, Response } from "express";
import { Product } from '../../../models/product';
import { Discount } from "../../../models/discount";

export const getProduct = async (req: Request, res: Response) => {
   try {
      const { _id } = req.user;
      if (!_id) {
         return res.status(401).json({ message: 'Unauthorized Access' })
      }
      const { _productId } = req.query
      const product = await Product.findById({ _id: _productId }).populate('_store').populate('_category').populate('discount')
      if (!product) {
         return res.status(404).json({
            succsess: false, message: 'Product Not Found'
         })
      }
      return res.status(200).json(
         {
            success: true, product: product,
         })
   } catch (error) {
      return res.status(500).json({ success: false, error: error.message })
   }
}
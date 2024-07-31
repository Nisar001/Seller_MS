import { Product } from "../../../models/product";
import { Request, Response } from "express";

export const deleteProductById = async (req: Request, res: Response) => {
   try {
      const { _id } = req.user // productId
      if (!_id) {
         return res.status(401).json({ message: 'Unauthorized' });
      }
      const { _productId } = req.query
      const product = await Product.findOne({ _id: _productId, _seller: _id })
      if (!product) {
         return res.json({ message: "Product not found" })
      }

      await Product.findByIdAndDelete({ _id: _productId });

      return res.status(200).json({ success: true, message: "Product deleted successfully" })
   } catch (error) {
      return res.status(500).json({ success: false, message: 'Server error', error });
   }
}
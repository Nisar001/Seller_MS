import { Product } from "../../../models/product";
import { Request, Response } from "express";

export const deleteProductById = async (req: Request, res: Response) => {
   try {
      const { id } = req.params // productId

      if (!req.user) {
         return res.status(401).json({ message: 'Unauthorized' });
      }
      const product = await Product.findById(id)
      if (!product) {
         return res.json({ message: "Product not found" })
      }
      if (product._seller.toString() !== req.user.id) {
         return res.status(403).json({ message: 'Forbidden: You do not have permission to delete this product' });
      }

      await Product.findByIdAndDelete(id);

      return res.status(200).json({ message: "Product deleted successfully" })
   } catch (error) {
      return res.status(500).json({ message: 'Server error', error });
   }
}
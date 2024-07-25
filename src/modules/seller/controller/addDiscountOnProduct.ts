import { Discount } from '../../../models/discount';
import { Product } from '../../../models/product';
import { Request, Response } from 'express'

export const addDiscountOnProduct = async (req: Request, res: Response) => {
   try {
      const { _sellerId } = req.user // seller id
      const { _productId } = req.params //product id (Changes after data striming)
      const { discountType, discountValue, startDate, endDate } = req.query;
      if (!discountType || !discountValue || !startDate || !endDate) {
         return res.status(204).json({ message: "All fields are required to fill" })
      }
      if (!req.user) {
         return res.status(401).json({ message: "Unauthorized success" })
      }
      const product = await Product.findOne({ _id: _productId })
      if (!product) {
         return res.status(404).json({ message: "Product not found" })
      }
      const discount = await Discount.create({
         _seller: _sellerId,
         _product: product._id,
         discountType: discountType,
         discountValue: discountValue,
         startDate: startDate,
         endDate: endDate
      })
      return res.status(200).json({ message: "Discount added on product", discount })
   } catch (error) {
      return res.status(500).json({ message: "Server Error", error })
   }
}
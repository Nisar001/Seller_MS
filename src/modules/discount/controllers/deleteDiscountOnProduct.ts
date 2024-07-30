import { Discount } from '../../../models/discount';
import { Request, Response } from 'express'

export const deleteDiscountOnProduct = async (req: Request, res: Response) => {
   try {
      const { _id } = req.params // discountId

      if (!req.user) {
         return res.status(401).json({ message: 'Unauthorized' });
      }
      const discount = await Discount.findById(_id)
      if (!discount) {
         return res.json({ message: "discount not found" })
      }
      if (discount._seller.toString() !== req.user.id) {
         return res.status(403).json({ message: 'Forbidden: You do not have permission to delete this discount' });
      }

      await Discount.findByIdAndDelete(_id);

      return res.status(200).json({ message: "Discount deleted successfully" })
   } catch (error) {
      return res.status(500).json({ error: error.message })
   }
}
import { Discount } from '../../../models/discount';
import { Request, Response } from 'express'

export const updateDiscountOnProduct = async (req: Request, res: Response) => {
   try {
      const { _id } = req.user;
      if (!_id) {
         return res.status(401).json({ message: "Unauthorized Access" })
      }
      const { _discountId } = req.params;
      const { discountType, discountValue, startDate, endDate } = req.body;
      if ([discountType, discountValue, startDate, endDate].some((field: string) => field.trim() === '')) {
         return res.status(400).json({ error: 'Fields cannot be empty' })
      }
      const discount = await Discount.findOne({ _id: _discountId })
      if (discountType || discountValue || startDate || endDate) {
         discount.discountType = discountType,
            discount.discountValue = discountValue,
            discount.startDate = startDate,
            discount.endDate = endDate
         await discount.save()
         return res.status(200).json({ message: 'Discount on product updated sussessfully', discount })
      }
      return res.status(400).json({ error: 'Plase provide some fields to update' })
   } catch (error) {
      return res.status(500).json({ error: error.message })
   }
}
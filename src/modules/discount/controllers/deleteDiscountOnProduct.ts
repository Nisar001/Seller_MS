import { Discount } from '../../../models/discount';
import { Request, Response } from 'express'

export const deleteDiscountOnProduct = async (req: Request, res: Response) => {
   try {
      const { _id } = req.user;
      if (!_id) {
         return res.status(401).json({ message: 'Unauthorized' });
      }
      const { _discountId } = req.query // discountId
      const discount = await Discount.findOne({ _id: _discountId, _seller: _id })
      if (!discount) {
         return res.json({ message: "discount not found" })
      }
      await Discount.findByIdAndDelete({ _id: _discountId });
      return res.status(200).json({ success: true, message: "Discount deleted successfully" })
   } catch (error) {
      return res.status(500).json({ error: error.message })
   }
}
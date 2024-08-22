import { Discount } from '../../../models/discount';
import { Product } from '../../../models/product';
import { Request, Response } from 'express';
import moment from 'moment';

export const updateDiscountOnProduct = async (req: Request, res: Response) => {
   try {
      const { _id } = req.user; // Seller ID
      if (!_id) {
         return res.status(401).json({ message: 'Unauthorized Access' });
      }

      const { _discountId, _productId } = req.query;
      if (!_discountId || !_productId) {
         return res.status(400).json({ message: 'Discount ID and Product ID are required' });
      }

      const { discountType, discountValue, startDate, endDate } = req.body;

      // Validation for non-empty fields
      const isNonEmpty = (field: any) => {
         if (typeof field === 'string') {
            return field.trim() !== '';
         }
         if (typeof field === 'number') {
            return !isNaN(field);
         }
         return false;
      };

      if (
         !isNonEmpty(discountType) ||
         !isNonEmpty(discountValue) ||
         !isNonEmpty(startDate) ||
         !isNonEmpty(endDate)
      ) {
         return res.status(400).json({ error: 'Fields cannot be empty' });
      }

      // Validate startDate and endDate
      if (startDate && endDate) {
         const start_date = moment(startDate, 'YYYY-MM-DD');
         const end_date = moment(endDate, 'YYYY-MM-DD');

         if (start_date.isAfter(end_date)) {
            return res.status(400).json({ error: 'startDate cannot be greater than endDate' });
         }

         if (!start_date.isValid() || !end_date.isValid()) {
            return res.status(400).json({ error: 'Invalid date format. Use YYYY-MM-DD.' });
         }

         const today = moment().startOf('day');
         if (start_date.isBefore(today) || end_date.isBefore(today)) {
            return res.status(400).json({ error: 'Dates cannot be in the past.' });
         }
      }

      // Check if the discount belongs to the seller and the product exists
      const discount = await Discount.findOne({ _id: _discountId, _seller: _id });
      if (!discount) {
         return res.status(404).json({ message: 'Discount not found or you do not have permission to update it' });
      }

      const product = await Product.findOne({ _id: _productId, _store: discount._store });
      if (!product) {
         return res.status(404).json({ message: 'Product not found or does not belong to the store associated with this discount' });
      }

      if (discountValue > product.price) {
         return res.status(400).json({ message: 'Discount value cannot be greater than the product price' });
      }

      // Update the discount details
      discount.discountType = discountType;
      discount.discountValue = discountValue;
      discount.startDate = startDate;
      discount.endDate = endDate;
      await discount.save();

      // Update product discounted price if necessary
      let discountedPrice: number;
      if (discountType === 'percent') {
         discountedPrice = product.mrp - (product.mrp * (discountValue / 100));
      } else if (discountType === 'price') {
         discountedPrice = product.mrp - discountValue;
      }

      product.discountedPrice = discountedPrice;
      await product.save();

      return res.status(200).json({ success: true, message: 'Discount updated successfully', discount, discountedPrice });
   } catch (error) {
      return res.status(500).json({ success: false, message: 'Server Error', error: error.message });
   }
};

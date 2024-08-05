import { Product } from '../../../models/product';
import { Request, Response } from 'express'
import { Category } from '../../../models/category';
import { Discount } from '../../../models/discount';
export const getAllProducts = async (req: Request, res: Response) => {
   try {
      const { _id } = req.user; // user id 
      if (!_id) {
         return res.status(401).json({ message: 'Unauthorized Access' })
      }
      //const {page=1, limit=10, name} = req.query;
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const name = req.query.name as string;

      const query = name
         ? { _seller: _id, name: { $regex: name, $options: 'i' } }
         : { _seller: _id };

      const products = await Product.find(query).populate('_store').populate('_category')
         .skip((page - 1) * limit)
         .limit(limit);
      const discount = await Discount.find({ _seller: _id })

      if (products.length === 0) {
         return res.json({ message: 'No Products, Please add some products' });
      }

      const total = await Product.countDocuments(query);

      return res.status(200).json({
         success: true,
         total,
         page,
         totalPages: Math.ceil(total / limit),
         products,
      });
   } catch (error) {
      return res.status(500).json({ success: false, message: 'Server Error', error: error.message })
   }
}

export const getProductsByCategory = async (req: Request, res: Response) => {
   try {
      const { _id } = req.user
      if (!_id) {
         return res.status(401).json({ message: 'Unauthorized Access' })
      }
      const { _categoryId } = req.query; //categoryId
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const name = req.query.name as string;

      const query = name
         ? { _seller: _id, _category: _categoryId, name: { $regex: name, $options: 'i' } }
         : { _seller: _id, _category: _categoryId };

      const products = await Product.find(query).populate('_store').populate('_category')
         .skip((page - 1) * limit)
         .limit(limit);



      if (products.length === 0) {
         return res.json({ message: 'No Products, Please add some products' });
      }

      const total = await Product.countDocuments(query);

      return res.status(200).json({
         success: true,
         total,
         page,
         totalPages: Math.ceil(total / limit),
         products,
      });
   } catch (error) {
      return res.status(500).json({ success: false, message: 'Server Error', error: error.message })
   }
}
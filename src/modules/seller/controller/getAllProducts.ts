import { Product } from '../../../models/product';
import { Request, Response } from 'express'

export const getAllProducts = async (req: Request, res: Response) => {
   try {
      const { _id } = req.user; // user id 
      //const {page=1, limit=10, name} = req.query;
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const name = req.query.name as string || 'name';

      const products = await Product.find({ _id }).sort(name).skip((page - 1) * limit).limit(limit); //changes required after rabbit mq setup
      if (!products) {
         return res.json({ message: 'No Produsts, Please add some products' })
      }

      const total = await Product.countDocuments({ _id }); // seller id

      return res.status(200).json({
         total,
         page,
         totalPages: Math.ceil(total / limit),
         products
      })
   } catch (error) {
      return res.status(500).json({ message: 'Server Error', error: error.message })
   }
}

export const getProductsByCategory = async (req: Request, res: Response) => {
   try {
      const { _sellerId, _categoryId } = req.params; // sellerId and categoryId
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const name = req.query.name as string || 'name';

      const products = await Product.find({ _sellerId, _categoryId }).sort(name).skip((page - 1) * limit).limit(limit) //changes required after rabbit mq setup

      if (!products) {
         return res.json({ message: "No Products, Plase Add some Products" })
      }

      const total = await Product.countDocuments({ _sellerId, _categoryId })

      return res.status(200).json({
         total,
         page,
         totalPages: Math.ceil(total / limit),
         products
      })
   } catch (error) {
      return res.status(500).json({ message: 'Server Error', error: error.message })
   }
}
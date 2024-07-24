import { Product } from '../../../models/product';
import { Request, Response } from 'express'

export const updateProduct = async (req: Request, res: Response) => {
   try {
      const { _id } = req.user;
      const { name, price, description } = req.body
      if ([name, price].some((field: string) => field.trim() === '')) {
         return res.status(400).json({ message: 'Fields connot be empty' })
      }
      const product = await Product.findById(_id)
      if (name || price || description) {
         product.name = name
         product.price = price
         product.description = description
         await product.save()
         return res.status(200).json({
            message: 'Product Updated...', product: {
               product: product
            }
         })
      }
      return res.status(400).json({ message: 'Please Provide some field to update' })
   } catch (error) {
      return res.status(500).json({ error: error.message })
   }
}
import { Request, Response } from "express";
import { Product } from "../../../models/product";

export const CreateProduct = async (req: Request, res: Response) => {
   try {
      const { id } = req.user;
      const { _category } = req.params
      const { name, price, description } = req.body
      if (!name) {
         return res.json({ message: 'Product Name is Required' })
      }
      if (!price) {
         return res.json({ message: 'Product Price is Required' })
      }
      const product = await Product.create({
         _category,
         name,
         price,
         description
      })
      return res.status(201).json({
         message: "Product Added Successfully",
         product: {
            ProductId: product._id,
            productName: product.name,
            productPrice: product.price
         }
      })
   } catch (error) {
      return res.status(500).json({ error: error.message })
   }
}
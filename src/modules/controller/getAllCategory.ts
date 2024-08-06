import { Category } from "../../models/category";
import { Request, Response } from "express";

export const getAllCategory = async (req: Request, res: Response) => {
   try {
      const id = req.user
      const { page = 1, limit = 10, search = '' } = req.query;

      const pageNumber = parseInt(page as string, 10);
      const limitNumber = parseInt(limit as string, 10);

      const query = search
         ? { categoryname: { $regex: search as string, $options: 'i' } }
         : {};

      const categories = await Category.find(query)
         .skip((pageNumber - 1) * limitNumber)
         .limit(limitNumber);

      const total = await Category.countDocuments(query);

      res.status(200).json({
         categories,
         totalPages: Math.ceil(total / limitNumber),
         currentPage: pageNumber,
      });
   } catch (error) {
      res.status(500).send({ message: 'Server error', error });
   }
}
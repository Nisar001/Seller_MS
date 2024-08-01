import { Request, Response } from 'express'
import { Bundle } from '../../../models/bundle';

export const getAllBundleProductSale = async (req: Request, res: Response) => {
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

      const bundles = await Bundle.find(query)
         .skip((page - 1) * limit)
         .limit(limit);

      if (bundles.length === 0) {
         return res.json({ message: 'No Bundles, Please add some Bundles' });
      }

      const total = await Bundle.countDocuments(query);

      return res.status(200).json({
         success: true,
         total,
         page,
         totalPages: Math.ceil(total / limit),
         bundles,
      });
   } catch (error) {
      res.status(500).json({ success: false, error: 'Internal Server Error' });
   }
};

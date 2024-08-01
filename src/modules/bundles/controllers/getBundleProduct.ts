import { Request, Response } from 'express'
//import { getBundleById } from './bundleController'
import { Bundle } from '../../../models/bundle'
export const getBundleProductSale = async (req: Request, res: Response) => {
   try {
      const { bundleId } = req.query
      //const bundle = await getBundleById({ bundleId });
      const bundle = await Bundle.findById({ _id: bundleId })
      if (!bundle) {
         return res.status(404).json({ message: 'Bundle not found' });
      }
      return res.status(200).json(bundle);
   } catch (error) {
      return res.status(500).json({ message: error.message });
   }
}
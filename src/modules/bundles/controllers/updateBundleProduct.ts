import { Request, Response } from 'express'
import { updateBundle } from './bundleController'
import { Bundle } from '../../../models/bundle';

export const updateBundleProductSale = async (req: Request, res: Response) => {
   try {
      const { bundleId } = req.query;
      const updateData = req.body;
      const bundle = await Bundle.findById({ _id: bundleId })
      if (!bundle) {
         return res.status(404).json({ message: "Bundle not found !" })
      }
      const updatedBundle = await updateBundle(bundleId, updateData);
      if (!updatedBundle) {
         return res.status(404).json({ message: 'Bundle not found' });
      }
      return res.status(200).json(updatedBundle);
   } catch (error) {
      return res.status(500).json({ message: error.message });
   }
}
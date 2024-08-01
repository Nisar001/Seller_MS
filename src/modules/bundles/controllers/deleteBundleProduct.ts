import { Request, Response } from 'express'
import { Bundle } from '../../../models/bundle';

export const deleteBundleProductSale = async (req: Request, res: Response) => {
   try {
      const { bundleId } = req.query;
      const deletedBundle = await Bundle.findByIdAndDelete({ _id: bundleId });
      if (!deletedBundle) {
         return res.status(404).json({ message: 'Bundle not found' });
      }
      return res.status(200).json({ success: true, message: 'Bundle deleted successfully' });
   } catch (error) {
      return res.status(500).json({ message: error.message });
   }
}
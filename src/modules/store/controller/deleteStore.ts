import { Request, Response } from "express";
import { Store } from "../../../models/sellerStore";
import { Product } from "../../../models/product";

export const deleteStore = async (req: Request, res: Response) => {
   try {
      const _id = req.user
      if (!_id) {
         return res.status(403).json({ message: 'Unauthorized Access.' })
      }
      const { id } = req.query;
      const store = await Store.findById({ _id: id });
      if (store) {
         await Product.findOneAndDelete({ _store: id })
         await Store.findByIdAndDelete({ _id: id })
         return res.status(200).send({ success: true, message: 'Store and their Products are deleted successfully' });
      } else
         return res.status(404).send({ message: 'Store not found' });
   } catch (error) {
      return res.status(500).json({ error: error.message })

   }
}
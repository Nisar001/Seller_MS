import { Store } from "../../../models/sellerStore";
import { Request, Response } from "express";

export const getStoreById = async (req: Request, res: Response) => {
   try {
      const _id = req.user;
      const { id } = req.query
      if (!_id) {
         return res.status(403).json({ message: 'Unauthorized Access.' })
      }
      if (!id) {
         return res.status(400).json({ message: 'Please Provide the Store Id.' })
      }
      const store = await Store.findById({ _id: id })
      if (!store) {
         return res.status(404).json({ message: 'Store not found.' })
      } else
         return res.status(200).json({ messgae: 'Store found', store })
   } catch (error) {
      return res.status(500).json({ error: error.message })
   }
}
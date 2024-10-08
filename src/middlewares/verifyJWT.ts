import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";
import { Seller } from './../models/seller';
dotenv.config();

const jwt_secret: string = process.env.JWT_SECRET as string;
interface JwtPayload {
   _id: string;
}

export const verify_token = async (
   req: Request,
   res: Response,
   next: NextFunction,
) => {
   try {
      const token = req.headers?.authorization?.split(" ")[1];
      if (!token) {
         return res.status(400).json({ error: "Invalid token" });
      }
      const decode = jwt.verify(token, jwt_secret) as JwtPayload;
      const user = await Seller.findById(decode?._id).lean();
      if (!user) {
         return res.status(400).json({ error: "Invalid user" });
      }

      req.user = user;
      next();
   } catch (error) {
      res.status(500).json({ error: error });
   }
};

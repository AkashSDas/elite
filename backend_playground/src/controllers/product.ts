import { NextFunction, Request, Response } from "express";
import { Product } from "../models/product";
import formidable, { File } from "formidable";
import * as fs from "fs";

declare module "express-serve-static-core" {
  interface Request {
    product: any;
  }
}

export function getProductById(
  req: Request,
  res: Response,
  next: NextFunction,
  id: string
) {
  Product.findById(id)
    .populate("category")
    .exec((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "Product not found",
        });
      }

      req.product = product;
      next();
    });
}

export function createProduct(req: Request, res: Response, next: NextFunction) {
  let form = new formidable.IncomingForm({ keepExtensions: true });

  form.parse(req, (err, fields, file) => {
    if (err) {
      // If user is coming till here after passing all vaidators
      // then chances are high that the problem is in file itself
      return res.status(400).json({
        error: "Problem with image",
      });
    }

    const { name, description, price, stock, category } = fields;

    if (!name || !description || !price || !stock || !category) {
      return res.status(400).json({
        error: "Please include all the fields",
      });
    }

    let product = new Product(fields);

    // Handle file here
    if (file.photo) {
      // > 3mb
      if ((file.photo as File).size > 3 * 1024 * 1024) {
        return res.status(400).json({
          error: "File size too big",
        });
      }

      product.photo.data = fs.readFileSync((file.photo as File).path);
      product.photo.contentType = (file.photo as File).type;
    }

    // save in the database
    product.save((err, p) => {
      if (err) {
        return res.status(400).json({
          error: "Saving the product failed",
        });
      }

      return res.json(p);
    });
  });
}

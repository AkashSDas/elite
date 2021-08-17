import { NextFunction, Request, Response } from "express";
import { Product } from "../models/product";
import formidable, { File } from "formidable";
import * as fs from "fs";
import _ from "lodash";

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

export function getProduct(req: Request, res: Response) {
  // In most applications files are not served directly on the get request
  // as these files can be tricky or bulky. So in this case these files
  // are assigned as undefined and this will increase the speed for serving the
  // get request

  req.product.photo = undefined;
  return res.json(req.product);
}

// This middleware will load the photo on backlog while the getProduct
// will be serving the front-end
export function photo(req: Request, res: Response, next: NextFunction) {
  // If there is data then only we return the data
  // This will make our application very fast as we not serving files
  // directly
  if (req.product.photo.data) {
    res.set("Content-Type", req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
  next();
}

export function deleteProduct(req: Request, res: Response) {
  let product = req.product;
  product.remove((err, deletedProduct) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to delete product",
      });
    }

    return res.json({
      message: "Delete product successfully",
      product: deletedProduct,
    });
  });
}

export function updateProduct(req: Request, res: Response) {
  let form = new formidable.IncomingForm({ keepExtensions: true });

  form.parse(req, (err, fields, file) => {
    if (err) {
      // If user is coming till here after passing all vaidators
      // then chances are high that the problem is in file itself
      return res.status(400).json({
        error: "Problem with image",
      });
    }

    // updating product
    let product = req.product;
    product = _.extend(product, fields);

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
          error: "Updation of product failed",
        });
      }

      return res.json(p);
    });
  });
}

export function getAllProducts(req: Request, res: Response) {
  const limit = req.query.limit ? parseInt(req.query.limit as string) : 2;
  const sortBy = req.query.sortBy ? req.query.sortBy : "updatedAt";

  Product.find()
    .select("-photo")
    .populate("category")
    .sort([[sortBy, "desc"]]) // asc
    .limit(limit)
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({
          error: "No product found",
        });
      }

      res.json(products);
    });
}

export function updateProductStock(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let operations = req.body.order.products.map((p) => {
    return {
      updateOne: {
        filter: { _id: p._id },
        update: { $inc: { stock: -p.count, sold: +p.count } },
      },
    };
  });

  const options = {};
  Product.bulkWrite(operations, options, (err, products) => {
    if (err) {
      return res.status(400).json({
        error: "Bulk operation failed",
      });
    }

    next();
  });
}

export function getAllUniqueCategories(req: Request, res: Response) {
  const options = {};
  Product.distinct("category", options, (err, category) => {
    if (err) {
      return res.status(400).json({
        error: "No category found",
      });
    }

    return res.json(category);
  });
}

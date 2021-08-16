import { NextFunction, Request, Response } from "express";
import { Category } from "../models/category";

declare module "express-serve-static-core" {
  interface Request {
    category: any;
  }
}

export function getCategoryById(
  req: Request,
  res: Response,
  next: NextFunction,
  id: string
) {
  Category.findById(id).exec((err, category) => {
    if (err || !category) {
      return res.status(400).json({
        error: "Category not found in database",
      });
    }

    req.category = category;
    next();
  });
}

export function createCategory(req: Request, res: Response) {
  const category = new Category(req.body);
  category.save((err, category) => {
    if (err) {
      return res.status(400).json({
        error: "Could not save category in the database",
      });
    }

    res.json({ category });
  });
}

export function getCategory(req: Request, res: Response) {
  return res.json(req.category);
}

export function getAllCategory(req: Request, res: Response) {
  Category.find().exec((err, categories) => {
    if (err) {
      return res.status(400).json({
        error: "Could not get all categories from database",
      });
    }

    return res.json(categories);
  });
}

export function updateCategory(req: Request, res: Response) {
  const category = req.category;
  category.name = req.body.name;
  category.save((err, updatedCategory) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to update category",
      });
    }

    return res.json(updatedCategory);
  });
}

export function removeCategory(req: Request, res: Response) {
  const category = req.category;
  category.remove((err, deletedCategory) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to remove category",
      });
    }

    return res.json({
      message: "Deleted successfully",
    });
  });
}

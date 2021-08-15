import { NextFunction, Request, Response } from "express";
import { Order } from "../models/order";
import { User } from "../models/user";

// https://stackoverflow.com/questions/58200432/argument-of-type-req-request-res-iresponse-next-nextfunction-void-is
declare module "express-serve-static-core" {
  interface Request {
    profile: any;
  }
}

// For more info on extending features of Request, Response, etc... read the below post
// https://stackoverflow.com/questions/37377731/extend-express-request-object-using-typescript

export function getUserById(
  req: Request,
  res: Response,
  next: NextFunction,
  id: string
) {
  User.findById(id).exec((err, user): any => {
    if (err || !user) {
      return res.status(400).json({
        error: "No user was found in database",
      });
    }

    req.profile = user;
    next();
  });
}

export function getUser(req: Request, res: Response) {
  // Some data are irrelevant for client side so assigning them
  // as undefined
  req.profile.salt = undefined;
  req.profile.encryptPassword = undefined;
  req.profile.createdAt = undefined;
  req.profile.updatedAt = undefined;
  return res.json(req.profile);
}

// export function getAllUsers(req: Request, res: Response) {
//   User.find().exec((err, users) => {
//     if (err || !users) {
//       return res.status(400).json({
//         error: "No user found",
//       });
//     }

//     res.json(users);
//   });
// }

export function updateUser(req: Request, res: Response) {
  // User.findByIdAndUpdate(
  //   req.profile._id,
  //   req.body,
  //   { new: true },
  //   (err, user) => {
  //     console.log(err);
  //     console.log(user);

  //     // if no user is found then we'll get an error so
  //     // no need to check for user
  //     if (err) {
  //       return res.status(400).json({
  //         error: "You are not authorized to make changes",
  //       });
  //     }

  //     user.salt = undefined;
  //     user.encryptPassword = undefined;
  //     user.createdAt = undefined;
  //     user.updatedAt = undefined;
  //     res.json(user);
  //   }
  // );

  User.findByIdAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true, useFindAndModify: true },
    (err, user) => {
      console.log(err);
      console.log(user);

      // if no user is found then we'll get an error so
      // no need to check for user
      if (err) {
        return res.status(400).json({
          error: "You are not authorized to make changes",
        });
      }

      user.salt = undefined;
      user.encryptPassword = undefined;
      user.createdAt = undefined;
      user.updatedAt = undefined;
      res.json(user);
    }
  );
}

export function userPurchaseList(req: Request, res: Response) {
  Order.find({ user: req.profile._id })
    .populate("user", "_id username")
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({
          error: "No order in this user",
        });
      }

      return res.json(order);
    });
}

export function pushOrderInPurchaseList(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let purchases = [];
  req.body.order.products.forEach((product) => {
    purchases.push({
      _id: product._id,
      name: product.name,
      description: product.description,
      category: product.category,
      quantity: product.quantity,
      amount: req.body.order.amount,
      transactionId: req.body.order.transactionId,
    });
  });

  // store this in database
  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $push: { purchases: purchases } },
    { new: true },
    (err, purchases) => {
      if (err) {
        return res.status(400).json({
          error: "Unable to save purchase list",
        });
      }

      next();
    }
  );
}

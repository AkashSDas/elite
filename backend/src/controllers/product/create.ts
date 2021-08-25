import { Request, Response } from "express";
import formidable, { File } from "formidable";
import { bucket } from "../../firebase";
import Product from "../../models/product";
import { runAsync } from "../../utils";
import { responseMsg } from "../json_response";
import { v4 } from "uuid";

function createProduct(req: Request, res: Response) {
  let form = new formidable.IncomingForm({ keepExtensions: true });

  form.parse(
    req,
    async (err: any, fields: formidable.Fields, files: formidable.Files) => {
      if (err) {
        // If user is coming till here after passing all vaidators
        // then chances are high that the problem is in file itself
        return responseMsg(res, {
          status: 400,
          message: "There is some problem with the image file",
        });
      }

      const { name, description, price, stock, category } = fields;
      const { photo } = files;
      if (!name || !description || !price || !stock || !category || !photo)
        return responseMsg(res, {
          status: 400,
          message: "Please include all the fields",
        });

      let product = new Product(fields);

      /// Save photo
      const userId = req.profile._id;
      const filename = (photo as File).name;

      /// Make images have public link. For this add the following part
      /// contentType: "image/png",
      /// metadata: {
      ///   metadata: {
      ///     firebaseStorageDownloadTokens: v4(),
      ///   },
      /// },
      /// Without the above code the image will be added to firebase storage
      /// but won't have public link by which it can be viewed
      /// Source of this solution
      /// https://github.com/firebase/firebase-admin-node/issues/694
      ///
      /// Also by default the contentType is application/octet-stream
      /// Changing it from that to image/png or image/* is good for viewing
      /// the image rather than downloading it with GET request to mediaLink
      /// of the saved file
      const uuid = v4();
      const destination = `product-photos/${userId}/${product._id}/${filename}`;
      const [result, error] = await runAsync(
        bucket.upload((photo as File).path, {
          destination,
          metadata: {
            contentType: "image/png",
            metadata: {
              firebaseStorageDownloadTokens: uuid,
            },
          },
        })
      );

      if (error)
        return responseMsg(res, {
          status: 400,
          message: "Could not save photo",
        });

      const photoURL =
        "https://firebasestorage.googleapis.com/v0/b/" +
        bucket.name +
        "/o/" +
        encodeURIComponent(destination) +
        "?alt=media&token=" +
        uuid;

      product.photoURL = photoURL;

      const [savedProduct, e] = await runAsync(product.save());
      if (e)
        return responseMsg(res, {
          status: 400,
          message: "Could not save product",
        });

      return responseMsg(res, {
        status: 200,
        error: false,
        message: "Successfully saved product",
        data: {
          product: {
            _id: savedProduct._id,
            name: savedProduct.name,
            description: savedProduct.description,
            price: savedProduct.price,
            stock: savedProduct.stock,
            sold: savedProduct.sold,
            photoURL: savedProduct.photoURL,
            category: savedProduct.category,
          },
        },
      });
    }
  );
}

export default createProduct;

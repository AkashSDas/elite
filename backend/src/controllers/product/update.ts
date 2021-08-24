import { Request, Response } from "express";
import formidable, { File } from "formidable";
import { bucket } from "../../firebase";
import { runAsync } from "../../utils";
import { responseMsg } from "../json_response";
import { v4 } from "uuid";
import _ from "lodash";

function updateProduct(req: Request, res: Response) {
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

      let product = req.product;
      product = _.extend(product, fields);

      /// Save photo
      const { photo } = files;
      if (photo) {
        const userId = req.profile._id;
        const filename = (photo as File).name;
        const uuid = v4();
        const destination = `product-photos/${userId}/${product._id}/${filename}`;

        /// Delete photo
        /// Note: Be careful with deleteFiles, if empty string
        /// is passed to prefix then it will delete everything
        /// in the bucket
        const [__, deleteErr] = await runAsync(
          bucket.deleteFiles({
            prefix: `product-photos/${userId}/${product._id}`,
          })
        );

        /// If there's only one file to be deleted then use the below method
        ///   const [__, deleteErr] = await runAsync(
        ///     bucket.file(`product-photos/${userId}/${product._id}/filename`).delete()
        ///   );

        if (deleteErr)
          return responseMsg(res, {
            status: 400,
            message: "Failed to delete product",
            // message: "Failed to delete product photo",
          });

        if (deleteErr)
          return responseMsg(res, {
            status: 400,
            message: "Could not update photo",
          });

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
            message: "Could not update photo",
          });

        const photoURL =
          "https://firebasestorage.googleapis.com/v0/b/" +
          bucket.name +
          "/o/" +
          encodeURIComponent(destination) +
          "?alt=media&token=" +
          uuid;

        product.photo = photoURL;
      }

      const [updatedProduct, e] = await runAsync(product.save());
      if (e)
        return responseMsg(res, {
          status: 400,
          message: "Could not update product",
        });

      return responseMsg(res, {
        status: 200,
        error: false,
        message: "Successfully updated product",
        data: {
          product: {
            _id: updatedProduct._id,
            name: updatedProduct.name,
            description: updatedProduct.description,
            price: updatedProduct.price,
            stock: updatedProduct.stock,
            sold: updatedProduct.sold,
            photoURL: updatedProduct.photoURL,
            category: updatedProduct.category,
          },
        },
      });
    }
  );
}

export default updateProduct;

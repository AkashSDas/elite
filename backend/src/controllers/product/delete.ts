import { Request, Response } from "express";
import { bucket } from "../../firebase";
import { runAsync } from "../../utils";
import { responseMsg } from "../json_response";

async function deleteProduct(req: Request, res: Response) {
  const product = req.product;
  const userId = req.profile._id;

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

  /// Delete mongodb document
  const [data, err] = await runAsync(product.deleteOne({ _id: product._id }));
  if (err)
    return responseMsg(res, {
      status: 400,
      message: "Failed to delete product",
    });

  if (!data)
    return responseMsg(res, {
      status: 400,
      message: "Product does not exists",
    });

  return responseMsg(res, {
    status: 200,
    error: false,
    message: "Successfully deleted product",
    data: { deletedProduct: data },
  });
}

export default deleteProduct;

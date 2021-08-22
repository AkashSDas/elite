import { Response } from "express";
import { validationResult } from "express-validator";

interface ResponseMessage {
  status: number;
  error: boolean;
  message: string;
  data?: any;
}

export function responseMsg(
  res: Response,
  { status, error, message, data }: ResponseMessage,
  next: Function = () => {}
) {
  res.status(status).json({ error, message, data } as ResponseMessage);
  next();
}

/// Keeping request of type any since most of the request type
/// will be extended in their controller files
export function expressValidatorErrorResponse(req: any, res: Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    /// If errors are their then return array where 1st value is
    /// whether errors are their or not and 2nd value is response
    /// If error is their then return this response or else it is
    /// if it's not their then response is null

    return [
      true,
      responseMsg(res, {
        status: 422,
        message: errors.array()[0].msg,
        error: true,
      }),
    ];
  }

  return [false, null];
}

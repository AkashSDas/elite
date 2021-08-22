import { Response } from "express";

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

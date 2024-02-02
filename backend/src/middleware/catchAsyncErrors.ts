import { Request, Response, NextFunction } from "express";

type ExpressMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>;

module.exports =
  (theFun: ExpressMiddleware) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(theFun(req, res, next)).catch(next);
  };

import { NextFunction, Request, Response, Router } from 'express';

export class ResponseHandler<T> {
  statusCode: number;
  data: T;

  constructor(statusCode: number, data: T) {
    this.statusCode = statusCode;
    this.data = data;
  }
}

export class BaseController {
  protected readonly _route: string = '/';
  public readonly router = Router();

  public asyncHandler<T>(
    fn: (req: Request, res: Response, next: NextFunction) => Promise<T>
  ) {
    return (req: Request, res: Response, next: NextFunction) => {
      Promise.resolve(fn(req, res, next)).catch(next);
    };
  }

  protected async _initializeRoutes() {}
}

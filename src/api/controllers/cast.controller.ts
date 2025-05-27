import { Request, Response } from 'express';
import { BaseController, ResponseHanlder } from '../base/base.controller';
import { CastService } from '../services/cast.services';

enum RoutePath {
  CastInCommon = '/get-cast-in-common',
}

class CastController extends BaseController {
  protected override readonly _route: string = '/cast';

  constructor(private readonly _castService: CastService) {
    super();

    this._initializeRoutes();
  }

  protected override async _initializeRoutes() {
    this.router.post(
      this._route + RoutePath.CastInCommon,
      this.asyncHandler(this.getCastInCommon.bind(this))
    );
  }

  async getCastInCommon(req: Request, res: Response) {
    const { titles } = req.body;
    const result = await this._castService.getCastInCommon(titles);

    return res.json(new ResponseHanlder(200, result));
  }
}

export const castController = new CastController(new CastService());

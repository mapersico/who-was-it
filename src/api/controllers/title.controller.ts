import { Request, Response } from 'express';
import { BaseController, ResponseHandler } from '../base/base.controller';
import { TitleService } from '../services/title.service';

enum RoutePath {
  TitlesByQuery = '/titles-by-query',
}

class TitleController extends BaseController {
  protected override readonly _route: string = '/movie';

  constructor(private readonly _titleService: TitleService) {
    super();

    this._initializeRoutes();
  }

  protected override async _initializeRoutes() {
    this.router.get(
      this._route + RoutePath.TitlesByQuery,
      this.asyncHandler(this.getTvAndMoviesByQuery.bind(this))
    );
  }

  async getTvAndMoviesByQuery(req: Request, res: Response) {
    const { query } = req.query;
    const result = await this._titleService.getTvAndMoviesByQuery(
      query?.toString() || ''
    );

    return res.json(new ResponseHandler(200, result));
  }
}

export const titleController = new TitleController(new TitleService());

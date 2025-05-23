import { Request, Response } from 'express';

import { BaseController, ResponseHanlder } from '../base/base.controller';
import { TestService } from '../services/test.service';

enum RoutePath {
  HelloWorld = '/hello-world',
}

class TestController extends BaseController {
  public override readonly _route: string = '/test';

  constructor(private readonly _testService: TestService) {
    super();
    this._initializeRoutes();
  }

  protected override async _initializeRoutes() {
    this.router.get(
      this._route + RoutePath.HelloWorld,
      this.asyncHandler(this.getHelloWorld.bind(this)),
    );
  }

  private async getHelloWorld(req: Request, res: Response) {
    const response = await this._testService.getHelloWorld();

    return res.json(new ResponseHanlder(200, response));
  }
}

export const testController = new TestController(new TestService());

import { BaseService } from "../base/base.service";

export class TestService extends BaseService {
  constructor() {
    super();
  }

  async getHelloWorld() {
    const wait = new Promise((resolve) => setTimeout(resolve, 1000));
    await wait;
    return {
      message: 'Hello World',
    };
  }
}

import { ApiController } from './api.controller';

describe('api.controller', () => {
  it('root get', () => {
    const apiController = new ApiController();

    expect(apiController.root()).toEqual({
      message: 'Hello World!'
    });
  });
});

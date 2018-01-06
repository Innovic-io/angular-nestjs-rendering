import { ApiController } from './api.controller';

describe('api.controller', function() {

  it('root get', () => {

    const apiController = new ApiController();

    expect(apiController.root()).toEqual({
      message: 'Hello World!'
    });
  });
});

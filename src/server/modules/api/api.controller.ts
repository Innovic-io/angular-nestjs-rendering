import { Controller, Get } from '@nestjs/common';

@Controller('api')
export class ApiController {

  @Get('hello')
  root() {

    return {
      message: 'Hello World!',
    };
  }
}

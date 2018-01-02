import { Controller, Get } from '@nestjs/common';

@Controller('api')
export class ApiController {

  @Get('hello')
  root(): string {
    return 'Hello World!';
  }
}

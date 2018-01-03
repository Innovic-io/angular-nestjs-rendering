import { Controller, Get, Req, Res } from '@nestjs/common';
import { join } from 'path';

import { FOLDER_CLIENT, FOLDER_DIST } from '../../../shared/constants';

@Controller()
export class StaticController {

  @Get('*')
  serveStatic(@Res() res, @Req() req) {

    res.render(join(FOLDER_DIST, FOLDER_CLIENT, 'index.html'), { req });
  }
}

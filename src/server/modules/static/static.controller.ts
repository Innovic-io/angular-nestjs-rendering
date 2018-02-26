import { Controller, Get, Res } from '@nestjs/common';
import { join } from 'path';

import { FOLDER_CLIENT, FOLDER_DIST } from '../../../shared/constants';

@Controller()
export class StaticController {

  @Get('*')
  serveStatic(@Res() res) {

    return res.sendFile(join(FOLDER_DIST, FOLDER_CLIENT, 'index.html'));
  }
}

import { Module } from '@nestjs/common';

import { ApiModule } from './modules/api/api.module';
import { StaticModule } from './modules/static/static.module';
import { EventsGateway } from './events.gateway.';

@Module({
  imports: [ApiModule, StaticModule],
  controllers: [],
  components: [EventsGateway]
})
export class ApplicationModule {}

import { Module } from '@nestjs/common';
import { CatsServiceComponent } from './cats.service';
import { CatsResolvers } from './cats.resolvers';

@Module({
  components: [CatsServiceComponent, CatsResolvers],
})
export class CatsModule {}

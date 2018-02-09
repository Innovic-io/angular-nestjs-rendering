import {MiddlewaresConsumer, Module, RequestMethod} from '@nestjs/common';
import {GraphQLFactory, GraphQLModule} from '@nestjs/graphql';
import {graphiqlExpress, graphqlExpress} from 'apollo-server-express';

import { StaticModule } from './modules/static/static.module';
import { EventsGateway } from './events.gateway.';
import {PetsModule} from './modules/graphql/pets.module';
import {ApiModule} from './modules/api/api.module';
import {CatsModule} from './modules/cats/cats.module';

@Module({
  imports: [
    StaticModule,
    CatsModule,
    PetsModule,
    GraphQLModule,
    ApiModule,
  ],
  controllers: [],
  components: [
    EventsGateway,
  ],
})
export class ApplicationModule {
  constructor(private readonly graphQLFactory: GraphQLFactory) {}

  configure(consumer: MiddlewaresConsumer) {
    const schema = this.createSchema();

    consumer
      .apply(graphiqlExpress({ endpointURL: '/graphql' }))
      .forRoutes({ path: '/graphiql', method: RequestMethod.GET })
      .apply(graphqlExpress(req => ({ schema, rootValue: req })))
      .forRoutes({ path: '/graphql', method: RequestMethod.ALL });
  }

  createSchema() {
    const typeDefs = this.graphQLFactory.mergeTypesByPaths('./**/*.graphql');
    const schema = this.graphQLFactory.createSchema({ typeDefs });
    return this.graphQLFactory.createSchema({ typeDefs });
  }
}

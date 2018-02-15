import { MiddlewaresConsumer, Module, RequestMethod } from '@nestjs/common';
import { GraphQLFactory, GraphQLModule } from '@nestjs/graphql';
import { graphiqlExpress, graphqlExpress } from 'apollo-server-express';

import { StaticModule } from './modules/static/static.module';
import { EventsGateway } from './events.gateway.';
import { PetsModule } from './modules/pets/pets.module';
import mergeSchemas from 'graphql-tools/dist/stitching/mergeSchemas';
import { linkTypeDefs } from './link.typedefs';
import { ChirpsModule } from './modules/chirps/chirps.module';

@Module({
  imports: [
    StaticModule,
    PetsModule,
    ChirpsModule,
  //  SubscriptionsModule.forRoot(),
    GraphQLModule,
  ],
  controllers: [],
  components: [
    EventsGateway,
  ],
})
export class ApplicationModule {
  constructor(
 //   private readonly subscriptionsModule: SubscriptionsModule,
    private readonly graphQLFactory: GraphQLFactory) {}

  configure(consumer: MiddlewaresConsumer) {
    const schema = this.createSchema();
   // this.subscriptionsModule.createSubscriptionServer(schema);

    consumer
      .apply(graphiqlExpress({ endpointURL: '/graphql',
//          subscriptionsEndpoint: `ws://localhost:5401/subscriptions`
        }))
      .forRoutes({ path: '/graphiql', method: RequestMethod.GET })
      .apply(graphqlExpress(req => ({ schema, rootValue: req })))
      .forRoutes({ path: '/graphql', method: RequestMethod.ALL });
  }

  createSchema() {
    const typeDefs = this.graphQLFactory.mergeTypesByPaths('./**/*.graphql');
    const schema = this.graphQLFactory.createSchema({ typeDefs });

    const delegates = this.graphQLFactory.createDelegates();
    return mergeSchemas({
      schemas: [schema, linkTypeDefs],
      resolvers: delegates,
    });
  }
}

import { Logger, Module } from '@nestjs/common';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { toJSON } from '../plugins/mongoose-transform.plugin';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (
        configService: ConfigService,
      ): Promise<MongooseModuleOptions> => {
        const uri = configService.get<string>('MONGODB_URI');
        Logger.log(`Connecting to MongoDB at ${uri}`, 'DatabaseModule');
        console.log(`Connecting to MongoDB at ${uri}`, 'DatabaseModule');
        return {
          uri,
          connectionFactory: (connection) => {
            connection.plugin(toJSON);
            return connection;
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}

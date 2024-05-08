import { DynamicModule, Module } from '@nestjs/common'
import { ConfigModule } from './config/config.module'
import { LiburuModule } from './liburu/liburu.module'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { getAppConfigFromEnv } from './config/config.utils'

@Module({})
export class AppModule {
  static register(): DynamicModule {
    const config = getAppConfigFromEnv()

    const dbConnectionOptions: TypeOrmModuleOptions = {
      type: 'postgres',
      host: config.options.database.host,
      port: config.options.database.port,
      username: config.options.database.username,
      password: config.options.database.password,
      database: config.options.database.dbname,
      entities: [],
      synchronize: true,
    }

    return {
      module: AppModule,
      imports: [ConfigModule.register(config), TypeOrmModule.forRoot(dbConnectionOptions), LiburuModule],
    }
  }
}

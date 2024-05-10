import { DynamicModule, Module } from '@nestjs/common'
import { ConfigModule } from './config/config.module'
import { LiburuModule } from './liburu/liburu.module'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { AppConfig } from './config/config.models'
import { File } from './liburu/entities/file.entitiy'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import { Subject } from './liburu/entities/subject.entity'

@Module({})
export class AppModule {
  static register(config: AppConfig): DynamicModule {
    const dbConnectionOptions: TypeOrmModuleOptions = {
      type: 'postgres',
      host: config.options.database.host,
      port: config.options.database.port,
      username: config.options.database.username,
      password: config.options.database.password,
      database: config.options.database.dbname,
      namingStrategy: new SnakeNamingStrategy(),
      synchronize: true,
      entities: [File, Subject],
    }

    return {
      module: AppModule,
      imports: [ConfigModule.register(config), TypeOrmModule.forRoot(dbConnectionOptions), LiburuModule],
    }
  }
}

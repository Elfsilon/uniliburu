import { DynamicModule, Global, Module, ValueProvider } from '@nestjs/common'
import { AppConfig } from './config.models'
import { Config } from './config.token'

@Global()
@Module({})
export class ConfigModule {
  static register(config: AppConfig): DynamicModule {
    const AppConfigProvider: ValueProvider<AppConfig> = {
      provide: Config,
      useValue: config,
    }

    return {
      module: ConfigModule,
      providers: [AppConfigProvider],
      exports: [AppConfigProvider],
    }
  }
}

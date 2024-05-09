import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { getAppConfigFromEnv } from './config/config.utils'

async function bootstrap() {
  const config = getAppConfigFromEnv()

  const app = await NestFactory.create(AppModule.register(config))
  await app.listen(config.options.server.port)
}
bootstrap()

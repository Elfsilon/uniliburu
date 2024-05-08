import { AppConfig, AppEnv } from './config.models'

export function getAppConfigFromEnv(): AppConfig {
  return new AppConfig({
    env: new AppEnv(process.env.ENV),
    database: {
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      dbname: process.env.DATABASE_DBNAME,
    },
  })
}

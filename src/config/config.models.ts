export class AppConfig {
  constructor(public readonly options: ConfigOptions) {}
}

export interface ConfigOptions {
  env: AppEnv
  server: ServerOptions
  database: DatabaseOptions
}

export interface ServerOptions {
  port: number
}

export interface DatabaseOptions {
  host: string
  port: number
  username: string
  password: string
  dbname: string
}

export class AppEnv {
  constructor(private value: string) {}

  static readonly DEV_VALUE = 'development'
  static readonly STAGING_VALUE = 'staging'
  static readonly PROD_VALUE = 'production'

  get isProd(): boolean {
    return this.value === AppEnv.PROD_VALUE
  }

  get isDev(): boolean {
    return this.value === AppEnv.DEV_VALUE
  }

  get isStaging(): boolean {
    return this.value === AppEnv.STAGING_VALUE
  }
}

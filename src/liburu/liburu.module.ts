import { ClassProvider, FactoryProvider, Module, ValueProvider } from '@nestjs/common'
import { ReadingRepository, ReadingService, UploadsManagerService } from './liburu.interfaces'
import { BooksService } from './services/books.service'
import { BooksController } from './controllers/books.controller'
import { FileUploadsService } from './services/file_uploads.service'
import { BooksRepository } from './repositories/books.repository'

const UploadsManagerProvider: FactoryProvider<FileUploadsService> = {
  provide: UploadsManagerService,
  useFactory: () => new FileUploadsService(''),
}

const BooksServiceProvider: ClassProvider = {
  provide: ReadingService,
  useClass: BooksService,
}

const BooksRepositoryProvider: ClassProvider = {
  provide: ReadingRepository,
  useClass: BooksRepository,
}

@Module({
  controllers: [BooksController],
  providers: [UploadsManagerProvider, BooksServiceProvider, BooksRepositoryProvider],
})
export class LiburuModule {}

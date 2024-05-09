import { ClassProvider, FactoryProvider, Module } from '@nestjs/common'
import { ReadingRepository, ReadingService, SubjectsService, UploadsManagerService } from './liburu.interfaces'
import { BooksService } from './services/books.service'
import { BooksController } from './controllers/books.controller'
import { FileUploadsService } from './services/file_uploads.service'
import { BooksRepository } from './repositories/books.repository'
import { SubjectsController } from './controllers/subjects.controller'
import { UniversitySubjectsService } from './services/subjects.service'
import { UPLOADS_DIR } from './liburu.constants'

const UploadsManagerProvider: FactoryProvider<FileUploadsService> = {
  provide: UploadsManagerService,
  useFactory: () => new FileUploadsService(UPLOADS_DIR),
}

const BooksServiceProvider: ClassProvider = {
  provide: ReadingService,
  useClass: BooksService,
}

const BooksRepositoryProvider: ClassProvider = {
  provide: ReadingRepository,
  useClass: BooksRepository,
}

const SubjectsServiceProvider: ClassProvider = {
  provide: SubjectsService,
  useClass: UniversitySubjectsService,
}

@Module({
  controllers: [BooksController, SubjectsController],
  providers: [UploadsManagerProvider, BooksServiceProvider, BooksRepositoryProvider, SubjectsServiceProvider],
})
export class LiburuModule {}

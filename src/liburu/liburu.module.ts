import { ClassProvider, Module } from '@nestjs/common'
import { BooksController } from './controllers/books.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { File } from './entities/file.entitiy'
import { FileUploadsService, SubjectsService } from './liburu.interfaces'
import { BookUploadsService } from './services/book_uploads.service'
import { UniversitySubjectsService } from './services/university_subjects.service'
import { SubjectsController } from './controllers/subjects.controller'
import { Subject } from './entities/subject.entity'

const BookUploadsServiceProvider: ClassProvider = {
  provide: FileUploadsService,
  useClass: BookUploadsService,
}

const SubjectsServiceProvider: ClassProvider = {
  provide: SubjectsService,
  useClass: UniversitySubjectsService,
}

@Module({
  imports: [TypeOrmModule.forFeature([File, Subject])],
  controllers: [BooksController, SubjectsController],
  providers: [BookUploadsServiceProvider, SubjectsServiceProvider],
})
export class LiburuModule {}

import { ClassProvider, Module } from '@nestjs/common'
import { BooksController } from './controllers/books.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { File } from './entities/file.entitiy'
import { FacultiesService, FieldsService, FileUploadsService, SubjectsService } from './liburu.interfaces'
import { BookUploadsService } from './services/book_uploads.service'
import { UniversitySubjectsService } from './services/university_subjects.service'
import { SubjectsController } from './controllers/subjects.controller'
import { Subject } from './entities/subject.entity'
import { Field } from './entities/field.entity'
import { Faculty } from './entities/faculty.entity'
import { FacultiesController } from './controllers/faculties.service'
import { FieldsController } from './controllers/fields.controller'
import { UniversityFieldsService } from './services/university_fields.service'
import { UniversityFacultiesService } from './services/university_faculties.service'

const BookUploadsServiceProvider: ClassProvider = {
  provide: FileUploadsService,
  useClass: BookUploadsService,
}

const SubjectsServiceProvider: ClassProvider = {
  provide: SubjectsService,
  useClass: UniversitySubjectsService,
}

const FieldsServiceProvider: ClassProvider = {
  provide: FieldsService,
  useClass: UniversityFieldsService,
}

const FacultiesServiceProvider: ClassProvider = {
  provide: FacultiesService,
  useClass: UniversityFacultiesService,
}

@Module({
  imports: [TypeOrmModule.forFeature([File, Subject, Field, Faculty])],
  controllers: [BooksController, SubjectsController, FacultiesController, FieldsController],
  providers: [BookUploadsServiceProvider, SubjectsServiceProvider, FieldsServiceProvider, FacultiesServiceProvider],
})
export class LiburuModule {}

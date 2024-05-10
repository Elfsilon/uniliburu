import { ClassProvider, Module } from '@nestjs/common'
import { BooksController } from './controllers/books.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { File } from './entities/file.entitiy'
import { FileUploadsService } from './liburu.interfaces'
import { BookUploadsService } from './services/book_uploads.service'

const BookUploadsServiceProvider: ClassProvider = {
  provide: FileUploadsService,
  useClass: BookUploadsService,
}

@Module({
  imports: [TypeOrmModule.forFeature([File])],
  controllers: [BooksController],
  providers: [BookUploadsServiceProvider],
})
export class LiburuModule {}

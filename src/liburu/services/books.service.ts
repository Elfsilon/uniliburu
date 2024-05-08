import { Inject, Injectable } from '@nestjs/common'
import { Book, SearchFilters } from '../models/books.models'
import { ReadingRepository, ReadingService } from '../liburu.interfaces'

@Injectable()
export class BooksService implements ReadingService {
  constructor(@Inject(ReadingRepository) private readonly repository: ReadingRepository) {}

  async find(filters: SearchFilters): Promise<Book[]> {
    return this.repository.find(filters)
  }

  async publish(book: Book): Promise<void> {
    return this.repository.add(book)
  }

  async findByID(id: string): Promise<Book> {
    return this.repository.findByID(id)
  }

  async deleteByID(id: string): Promise<string> {
    return this.repository.deleteByID(id)
  }
}

import { Injectable } from '@nestjs/common'
import { Book, SearchFilters } from '../models/books.models'
import { ReadingRepository } from '../liburu.interfaces'

const fakeBook: Book = {
  title: 'Lorem ipsum',
  grade: 1,
  tags: ['A', 'B'],
}

@Injectable()
export class BooksRepository implements ReadingRepository {
  async find(filters: SearchFilters): Promise<Book[]> {
    return [fakeBook]
  }

  async findByID(id: string): Promise<Book> {
    return fakeBook
  }

  async add(book: Book): Promise<void> {
    return
  }

  async deleteByID(id: string): Promise<string> {
    return 'f5708f5a1aa1ad8b5d534b32b1860a45'
  }
}

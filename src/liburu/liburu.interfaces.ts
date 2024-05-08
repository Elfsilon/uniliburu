import { Book, SearchFilters } from './models/books.models'

export interface ReadingService {
  find(filters: SearchFilters): Promise<Book[]>
  publish(book: Book): Promise<void>
  findByID(id: string): Promise<Book>
  deleteByID(id: string): Promise<string>
}

export const ReadingService = Symbol('ReadingService')

export interface ReadingRepository {
  find(filters: SearchFilters): Promise<Book[]>
  findByID(id: string): Promise<Book>
  add(book: Book): Promise<void>
  deleteByID(id: string): Promise<string>
}
export const ReadingRepository = Symbol('ReadingRepository')

export interface UploadsManagerService {
  delete(filename: string): Promise<void>
}

export const UploadsManagerService = Symbol('UploadsManagerService')

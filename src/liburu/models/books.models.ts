export class Book {
  title: string
  grade: number
  tags: string[]
}

export class Books {
  books: Book[]
}

export class SearchFilters {
  text?: string
  grade?: number
  tags?: string[]
}

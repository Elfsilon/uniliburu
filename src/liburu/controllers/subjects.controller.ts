import { Controller, Delete, Get, Inject, Param, Put } from '@nestjs/common'
import { Subject, Subjects } from '../models/subjects.models'
import { SubjectsService } from '../liburu.interfaces'

@Controller('subjects')
export class SubjectsController {
  constructor(
    @Inject(SubjectsService)
    private readonly service: SubjectsService,
  ) {}

  @Get()
  async getSubjects(): Promise<Subjects> {
    return this.service.getSubjects()
  }

  @Put(':id/link/:book_id')
  async linkBook(@Param('id') subjectID: number, @Param('book_id') bookID: string): Promise<void> {
    return this.service.linkBook(subjectID, bookID)
  }

  @Delete(':id/link/:book_id')
  async unlinkBook(@Param('id') subjectID: number, @Param('book_id') bookID: string): Promise<void> {
    return this.service.unlinkBook(subjectID, bookID)
  }
}

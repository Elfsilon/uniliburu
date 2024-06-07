import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common'
import { SubjectsService } from '../liburu.interfaces'

class LinkCourseRequestBody {
  course: number
}

class LinkBookRequestBody {
  bookId: string
}

class LinkFieldRequestBody {
  fieldId: number
}

@Controller('subjects')
export class SubjectsController {
  constructor(
    @Inject(SubjectsService)
    private readonly service: SubjectsService,
  ) {}

  @Get()
  async list() {
    const subjects = await this.service.find()
    return { subjects }
  }

  @Post()
  async create(@Body() body: { title: string }) {
    const id = await this.service.add(body.title)
    return { id }
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    await this.service.delete(id)
  }

  @Put(':id/link/book')
  async linkBook(@Param('id') subjectID: number, @Body() body: LinkBookRequestBody) {
    await this.service.linkBook(subjectID, body.bookId)
  }

  @Delete(':id/link/book')
  async unlinkBook(@Param('id') subjectID: number, @Body() body: LinkBookRequestBody) {
    await this.service.unlinkBook(subjectID, body.bookId)
  }

  @Put(':id/link/course')
  async linkCourse(@Param('id') subjectID: number, @Body() body: LinkCourseRequestBody) {
    await this.service.linkCourse(subjectID, body.course)
  }

  @Delete(':id/link/course')
  async unlinkCourse(@Param('id') subjectID: number, @Body() body: LinkCourseRequestBody) {
    await this.service.unlinkCourse(subjectID, body.course)
  }

  @Put(':id/link/field')
  async linkField(@Param('id') subjectID: number, @Body() body: LinkFieldRequestBody) {
    await this.service.linkField(subjectID, body.fieldId)
  }

  @Delete(':id/link/field')
  async unlinkField(@Param('id') subjectID: number, @Body() body: LinkFieldRequestBody) {
    await this.service.unlinkField(subjectID, body.fieldId)
  }
}

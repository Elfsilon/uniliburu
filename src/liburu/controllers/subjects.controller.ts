import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common'
import { SubjectsService } from '../liburu.interfaces'

class LinkRequestBody {
  bookId: string
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

  @Put(':id/link')
  async linkBook(@Param('id') subjectID: number, @Body() body: LinkRequestBody) {
    await this.service.linkBook(subjectID, body.bookId)
  }

  @Delete(':id/link')
  async unlinkBook(@Param('id') subjectID: number, @Body() body: LinkRequestBody) {
    await this.service.unlinkBook(subjectID, body.bookId)
  }
}

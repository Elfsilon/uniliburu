import { Controller, Inject, Get, Post, Body, Delete, Param, Put, Query } from '@nestjs/common'
import { FieldsService } from '../liburu.interfaces'

class LinkFacultyRequestBody {
  facultyId: number
}

@Controller('fields')
export class FieldsController {
  constructor(
    @Inject(FieldsService)
    private readonly service: FieldsService,
  ) {}

  @Get()
  async list(@Query('facultyID') facultyID: number) {
    const fields = await this.service.find(facultyID)
    return { fields }
  }

  @Post()
  async create(@Body() body: { title: string; facultyId: number }) {
    const id = await this.service.add(body.title, body.facultyId)
    return { id }
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    await this.service.delete(id)
  }
}

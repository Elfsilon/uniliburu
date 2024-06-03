import { Controller, Inject, Get, Post, Body, Delete, Param } from '@nestjs/common'
import { FieldsService } from '../liburu.interfaces'

@Controller('fields')
export class FieldsController {
  constructor(
    @Inject(FieldsService)
    private readonly service: FieldsService,
  ) {}

  @Get()
  async list() {
    const fields = await this.service.find()
    return { fields }
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
}

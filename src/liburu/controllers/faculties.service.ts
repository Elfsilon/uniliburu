import { Controller, Inject, Get, Post, Body, Delete, Param } from '@nestjs/common'
import { FacultiesService } from '../liburu.interfaces'

@Controller('faculties')
export class FacultiesController {
  constructor(
    @Inject(FacultiesService)
    private readonly service: FacultiesService,
  ) {}

  @Get()
  async list() {
    const faculties = await this.service.find()
    return { faculties }
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

import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { Book, Books, SearchFilters } from '../models/books.models'
import { ReadingService, UploadsManagerService } from '../liburu.interfaces'
import { UPLOADS_DIR } from '../liburu.constants'

const PDF_MIMETYPE = 'application/pdf'

@Controller('books')
export class BooksController {
  constructor(
    @Inject(ReadingService)
    private readonly service: ReadingService,
    @Inject(UploadsManagerService)
    private readonly uploads: UploadsManagerService,
  ) {}

  @Get()
  async find(@Query() filters: SearchFilters): Promise<Books> {
    const books = await this.service.find(filters)
    return { books }
  }

  @Post()
  @UseInterceptors(FileInterceptor('file', { dest: UPLOADS_DIR }))
  async publish(@UploadedFile() file: Express.Multer.File, @Body() body: Book) {
    if (file === undefined) {
      throw new BadRequestException('file not passed')
    }

    if (file.mimetype !== PDF_MIMETYPE) {
      this.uploads.delete(file.filename)
      throw new BadRequestException(`got ${file.mimetype}, but ${PDF_MIMETYPE} expected`)
    }

    await this.service.publish(body)
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Book> {
    return this.service.findByID(id)
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    // Check if file exists and then try to delete?
    const filename = await this.service.deleteByID(id)
    await this.uploads.delete(filename)
  }
}

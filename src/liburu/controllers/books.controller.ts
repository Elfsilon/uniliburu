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
import { FileUploadsService } from '../liburu.interfaces'
import { UPLOADS_DIR } from '../liburu.constants'
import { UploadBookBody } from './books.models'

// TODO: add common exception filter to provide messages for all the error responses
// TODO: add helper that automatically checks for null or undefined given fields or whole object
@Controller('books')
export class BooksController {
  constructor(@Inject(FileUploadsService) private readonly service: FileUploadsService) {}

  @Get()
  async find(@Query('guid') guid?: string) {
    const books = await this.service.find(guid)
    return { books }
  }

  @Post()
  @UseInterceptors(FileInterceptor('file', { dest: UPLOADS_DIR }))
  async upload(@UploadedFile() file: Express.Multer.File, @Body() body: UploadBookBody) {
    if (file == null) {
      throw new BadRequestException('file field is required')
    }

    if (body.displayName == null) {
      throw new BadRequestException('displayName field is required')
    }

    const uploadedBook = await this.service.upload(body.displayName, file)
    return {
      guid: uploadedBook.guid,
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.service.delete(id)
  }
}

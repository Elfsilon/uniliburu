import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Inject,
  Param,
  Post,
  Query,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { FileUploadsService } from '../liburu.interfaces'
import { MIMETYPE_PDF, UPLOADS_DIR } from '../liburu.constants'

export class UploadBookBody {
  displayName: string
}

// TODO: add common exception filter to provide messages for all the error responses
// TODO: add helper that automatically checks for null or undefined given fields or whole object
@Controller('books')
export class BooksController {
  constructor(@Inject(FileUploadsService) private readonly service: FileUploadsService) {}

  @Get()
  async find(@Query('guids') guids: string[]) {
    const books = await this.service.find(guids)
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

  @Get(':guid')
  @Header('Content-Type', MIMETYPE_PDF)
  async findFile(@Param('guid') guid: string): Promise<StreamableFile> {
    const stream = await this.service.findFile(guid)
    return new StreamableFile(stream)
  }

  @Delete(':guid')
  async delete(@Param('guid') guid: string) {
    await this.service.delete(guid)
  }
}

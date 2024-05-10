import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { FileUploadsService } from '../liburu.interfaces'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { File } from '../entities/file.entitiy'
import { UPLOADS_DIR } from '../liburu.constants'
import * as path from 'path'
import * as fs from 'fs/promises'

const PDF_MIMETYPE = 'application/pdf'

@Injectable()
export class BookUploadsService implements FileUploadsService {
  constructor(@InjectRepository(File) private readonly repository: Repository<File>) {}

  async find(guid?: string): Promise<File[]> {
    if (guid) {
      const book = await this.repository.findOneBy({ guid: guid })
      return book ? [book] : []
    }

    return this.repository.find()
  }

  async upload(displayName: string, file: Express.Multer.File): Promise<File> {
    if (file.mimetype !== PDF_MIMETYPE) {
      this.deleteFile(file.filename)
      throw new BadRequestException(`${file.mimetype} file type is not supported yet`)
    }

    const book = new File()
    book.displayName = displayName
    book.fileName = file.filename

    return this.repository.save(book)
  }

  async delete(guid: string): Promise<any> {
    const found = await this.find(guid)
    if (found.length === 0) {
      throw new NotFoundException(`book with guid=${guid} not found`)
    }
    await this.repository.delete(guid)
    this.deleteFile(found[0].fileName)
  }

  private async deleteFile(filename: string): Promise<void> {
    const filepath = path.join(UPLOADS_DIR, filename)
    return fs.unlink(filepath)
  }
}
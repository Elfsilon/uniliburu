import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { FileUploadsService } from '../liburu.interfaces'
import { InjectRepository } from '@nestjs/typeorm'
import { FindOptionsWhere, Repository } from 'typeorm'
import { File } from '../entities/file.entitiy'
import { MIMETYPE_PDF, UPLOADS_DIR } from '../liburu.constants'
import { ReadStream, createReadStream } from 'fs'
import * as path from 'path'
import * as fs from 'fs/promises'

@Injectable()
export class BookUploadsService implements FileUploadsService {
  constructor(@InjectRepository(File) private readonly repository: Repository<File>) {}

  async find(guids?: string[]): Promise<File[]> {
    if (guids == null) {
      return this.repository.find()
    }

    const whereGuids = guids.map<FindOptionsWhere<File>>((guid) => {
      return { guid }
    })
    return this.repository.find({ where: whereGuids })
  }

  async findFile(guid: string): Promise<ReadStream> {
    const book = await this.repository.findOneBy({ guid })
    if (book == null) {
      throw new BadRequestException(`Book with guid=${guid} not found`)
    }
    return this.readFile(book.fileName)
  }

  async upload(displayName: string, file: Express.Multer.File): Promise<File> {
    if (file.mimetype !== MIMETYPE_PDF) {
      this.deleteFile(file.filename)
      throw new BadRequestException(`${file.mimetype} file type is not supported yet`)
    }

    const book = new File()
    book.displayName = displayName
    book.fileName = file.filename

    return this.repository.save(book)
  }

  async delete(guid: string): Promise<any> {
    const book = await this.repository.findOneBy({ guid })
    if (book == null) {
      throw new NotFoundException(`book with guid=${guid} not found`)
    }
    await this.repository.delete(guid)
    this.deleteFile(book.fileName)
  }

  private readFile(filename: string): ReadStream {
    const filepath = path.join(UPLOADS_DIR, filename)
    return createReadStream(filepath)
  }

  private deleteFile(filename: string): Promise<void> {
    const filepath = path.join(UPLOADS_DIR, filename)
    return fs.unlink(filepath)
  }
}

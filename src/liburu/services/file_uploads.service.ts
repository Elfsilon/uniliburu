import { Injectable } from '@nestjs/common'
import * as fs from 'fs/promises'
import * as path from 'path'
import { UploadsManagerService } from '../liburu.interfaces'

@Injectable()
export class FileUploadsService implements UploadsManagerService {
  constructor(private searchPath: string) {}

  async delete(filename: string): Promise<void> {
    const filepath = path.join(this.searchPath, filename)
    return fs.unlink(filepath)
  }
}

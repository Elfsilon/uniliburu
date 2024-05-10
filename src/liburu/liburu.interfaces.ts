import { ReadStream } from 'fs'
import { File } from './entities/file.entitiy'
import { Subjects } from './models/subjects.models'

export interface FileUploadsService {
  find(guid?: string): Promise<File[]>
  findFile(guid: string): Promise<ReadStream>
  upload(displayName: string, file: Express.Multer.File): Promise<File>
  delete(id: string): Promise<void>
}

export const FileUploadsService = Symbol('FileUploadsService')

export interface SubjectsService {
  getSubjects(): Promise<Subjects>
  linkBook(subjectID: number, bookID: string): Promise<void>
  unlinkBook(subjectID: number, bookID: string): Promise<void>
}

export const SubjectsService = Symbol('SubjectsService')

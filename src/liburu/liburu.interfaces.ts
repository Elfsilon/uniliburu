import { ReadStream } from 'fs'
import { File } from './entities/file.entitiy'
import { Subject } from './entities/subject.entity'

export interface FileUploadsService {
  find(guids?: string[]): Promise<File[]>
  findFile(guid: string): Promise<ReadStream>
  upload(displayName: string, file: Express.Multer.File): Promise<File>
  delete(id: string): Promise<void>
}

export const FileUploadsService = Symbol('FileUploadsService')

export interface SubjectsService {
  find(): Promise<Subject[]>
  add(title: string): Promise<number>
  delete(id: number): Promise<void>
  linkBook(subjectID: number, bookID: string): Promise<void>
  unlinkBook(subjectID: number, bookID: string): Promise<void>
}

export const SubjectsService = Symbol('SubjectsService')

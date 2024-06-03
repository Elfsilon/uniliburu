import { ReadStream } from 'fs'
import { File } from './entities/file.entitiy'
import { Subject } from './entities/subject.entity'
import { Field } from './entities/field.entity'
import { Faculty } from './entities/faculty.entity'

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

  linkField(subjectID: number, fieldID: number): Promise<void>
  unlinkField(subjectID: number, fieldID: number): Promise<void>

  linkFaculty(subjectID: number, facultyID: number): Promise<void>
  unlinkFaculty(subjectID: number, facultyID: number): Promise<void>

  linkCourse(subjectID: number, course: number): Promise<void>
  unlinkCourse(subjectID: number, course: number): Promise<void>
}

export const SubjectsService = Symbol('SubjectsService')

export interface FieldsService {
  find(): Promise<Field[]>
  add(title: string): Promise<number>
  delete(id: number): Promise<void>
}

export const FieldsService = Symbol('FieldsService')

export interface FacultiesService {
  find(): Promise<Faculty[]>
  add(title: string): Promise<number>
  delete(id: number): Promise<void>
}

export const FacultiesService = Symbol('FacultiesService')

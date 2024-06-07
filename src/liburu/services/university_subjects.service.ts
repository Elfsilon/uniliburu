import { Injectable, NotFoundException } from '@nestjs/common'
import { SubjectsService } from '../liburu.interfaces'
import { Repository } from 'typeorm'
import { Subject } from '../entities/subject.entity'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class UniversitySubjectsService implements SubjectsService {
  constructor(@InjectRepository(Subject) private readonly repository: Repository<Subject>) {}

  async find(): Promise<Subject[]> {
    return this.repository.find({ loadRelationIds: true })
  }

  async add(title: string): Promise<number> {
    const subject = new Subject()
    subject.title = title

    const added = await this.repository.save(subject)
    return added.id
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id)
  }

  async linkBook(subjectID: number, bookID: string): Promise<void> {
    await this.repository.createQueryBuilder().relation(Subject, 'books').of(subjectID).add(bookID)
  }

  async unlinkBook(subjectID: number, bookID: string): Promise<void> {
    await this.repository.createQueryBuilder().relation(Subject, 'books').of(subjectID).remove(bookID)
  }

  async linkField(subjectID: number, fieldID: number): Promise<void> {
    await this.repository.createQueryBuilder().relation(Subject, 'fields').of(subjectID).add(fieldID)
  }

  async unlinkField(subjectID: number, fieldID: number): Promise<void> {
    await this.repository.createQueryBuilder().relation(Subject, 'fields').of(subjectID).remove(fieldID)
  }

  async linkCourse(subjectID: number, course: number): Promise<void> {
    const sub = await this.repository.findOne({ where: { id: subjectID } })
    sub.courses.push(course)
    await this.repository.save(sub)
  }

  async unlinkCourse(subjectID: number, course: number): Promise<void> {
    const sub = await this.repository.findOne({ where: { id: subjectID } })
    sub.courses = sub.courses.filter((c) => c != course)
    await this.repository.save(sub)
  }
}

import { Injectable, NotFoundException } from '@nestjs/common'
import { SubjectsService } from '../liburu.interfaces'
import { Repository } from 'typeorm'
import { Subject } from '../entities/subject.entity'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class UniversitySubjectsService implements SubjectsService {
  constructor(@InjectRepository(Subject) private readonly repository: Repository<Subject>) {}

  async find(): Promise<Subject[]> {
    return this.repository.find()
  }

  async add(title: string): Promise<number> {
    const subject = new Subject()
    subject.title = title
    subject.courses = []
    subject.facultyIds = []
    subject.fieldIds = []
    subject.linkedBookIds = []
    subject.professorIds = []

    const added = await this.repository.save(subject)
    return added.id
  }

  async delete(id: number): Promise<void> {
    const sub = await this.repository.findOneBy({ id: id })
    if (sub == null) {
      throw new NotFoundException(`subject with id=${id} not found`)
    }
    await this.repository.delete(id)
  }

  async linkBook(subjectID: number, bookID: string): Promise<void> {
    const sub = await this.repository.findOneBy({ id: subjectID })
    if (sub == null) {
      throw new NotFoundException(`subject with id=${subjectID} not found`)
    }
    sub.linkedBookIds.push(bookID)
    this.repository.save(sub)
  }

  async unlinkBook(subjectID: number, bookID: string): Promise<void> {
    const sub = await this.repository.findOneBy({ id: subjectID })
    if (sub == null) {
      throw new NotFoundException(`subject with id=${subjectID} not found`)
    }
    sub.linkedBookIds = sub.linkedBookIds.filter((id) => id !== bookID)
    this.repository.save(sub)
  }
}

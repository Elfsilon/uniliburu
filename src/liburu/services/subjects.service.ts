import { Injectable } from '@nestjs/common'
import { SubjectsService } from '../liburu.interfaces'
import { Subject, Subjects } from '../models/subjects.models'

const fakeSubject: Subject = {
  id: 1,
  title: 'Anim amet aliqua id irure esse consectetur et cillum nostrud',
  courses: [1, 2],
  facultyIDs: [5, 6],
  fieldIDs: [44, 65],
  professorIDs: [234, 776, 892],
  linkedBookIDs: ['ab656f565ga5656asd6656', 'ab656f565gas67d67sdf6sd5f'],
}

const fakeSubjects: Subjects = {
  subjects: Array.from({ length: 10 }, (_, __) => fakeSubject),
}

@Injectable()
export class UniversitySubjectsService implements SubjectsService {
  async getSubjects(): Promise<Subjects> {
    return fakeSubjects
  }

  async linkBook(subjectID: number, bookID: string): Promise<void> {}

  async unlinkBook(subjectID: number, bookID: string): Promise<void> {}
}

export class Subject {
  id: number
  title: string
  professorIDs: number[]
  facultyIDs: number[]
  // Направления
  fieldIDs: number[]
  courses: number[]
  linkedBookIDs: string[]
}

export class Subjects {
  subjects: Subject[]
}

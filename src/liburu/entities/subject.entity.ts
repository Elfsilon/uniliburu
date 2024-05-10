import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Subject {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column('int', { array: true, default: [] })
  facultyIds: number[]

  // Направления
  @Column('int', { array: true, default: [] })
  fieldIds: number[]

  @Column('int', { array: true, default: [] })
  courses: number[]

  @Column('int', { array: true, default: [] })
  professorIds: number[]

  @Column('uuid', { array: true, default: [] })
  linkedBookIds: string[]
}

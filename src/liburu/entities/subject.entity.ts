import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Faculty } from './faculty.entity'
import { Field } from './field.entity'
import { File } from './file.entitiy'

@Entity('subjects')
export class Subject {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column('int', { array: true, default: [] })
  courses: number[]

  @ManyToMany(() => Faculty)
  @JoinTable()
  faculties: Faculty[]

  @ManyToMany(() => Field)
  @JoinTable()
  fields: Field[]

  @ManyToMany(() => File)
  @JoinTable()
  books: File[]
}

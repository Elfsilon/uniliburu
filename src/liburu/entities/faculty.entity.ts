import { Column, Entity, JoinTable, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Field } from './field.entity'

@Entity('faculties')
export class Faculty {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @OneToMany(() => Field, (f) => f.faculty)
  @JoinTable({ name: 'id' })
  fields: Field[]
}

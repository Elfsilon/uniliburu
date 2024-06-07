import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Faculty } from './faculty.entity'

@Entity('fields')
export class Field {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @ManyToOne(() => Faculty, (f) => f.fields, { onDelete: 'CASCADE' })
  faculty: Faculty
}

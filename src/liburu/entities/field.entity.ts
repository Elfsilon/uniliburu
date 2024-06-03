import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('fields')
export class Field {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string
}

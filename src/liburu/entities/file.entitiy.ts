import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class File {
  @PrimaryGeneratedColumn('uuid')
  guid: string

  @Column()
  displayName: string

  @Column()
  fileName: string
}

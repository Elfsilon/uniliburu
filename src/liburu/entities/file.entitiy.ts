import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('files')
export class File {
  @PrimaryGeneratedColumn('uuid')
  guid: string

  @Column()
  displayName: string

  @Column()
  fileName: string
}

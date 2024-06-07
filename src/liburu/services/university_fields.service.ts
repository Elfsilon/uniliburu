import { Injectable } from '@nestjs/common'
import { FieldsService } from '../liburu.interfaces'
import { Field } from '../entities/field.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class UniversityFieldsService implements FieldsService {
  constructor(@InjectRepository(Field) private readonly repository: Repository<Field>) {}

  async find(facultyID?: number): Promise<Field[]> {
    if (!facultyID) return this.repository.find()

    return this.repository.find({
      where: {
        faculty: { id: facultyID },
      },
    })
  }

  async add(title: string, facultyID: number): Promise<number> {
    const field = new Field()
    field.title = title

    const added = await this.repository.save(field)
    await this.repository.createQueryBuilder().relation(Field, 'faculty').of(field.id).set(facultyID)
    return added.id
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id)
  }
}

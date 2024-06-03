import { Injectable } from '@nestjs/common'
import { FieldsService } from '../liburu.interfaces'
import { Field } from '../entities/field.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class UniversityFieldsService implements FieldsService {
  constructor(@InjectRepository(Field) private readonly repository: Repository<Field>) {}

  async find(): Promise<Field[]> {
    return this.repository.find()
  }

  async add(title: string): Promise<number> {
    const field = new Field()
    field.title = title

    const added = await this.repository.save(field)
    return added.id
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id)
  }
}

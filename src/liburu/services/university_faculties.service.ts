import { Injectable } from '@nestjs/common'
import { FacultiesService } from '../liburu.interfaces'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Faculty } from '../entities/faculty.entity'

@Injectable()
export class UniversityFacultiesService implements FacultiesService {
  constructor(@InjectRepository(Faculty) private readonly repository: Repository<Faculty>) {}

  async find(): Promise<Faculty[]> {
    return this.repository.find()
  }

  async add(title: string): Promise<number> {
    const fac = new Faculty()
    fac.title = title

    const added = await this.repository.save(fac)
    return added.id
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id)
  }
}

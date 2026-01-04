import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActorEntity } from './entities/actor.entitie';
import { Not, Repository } from 'typeorm';
import { CreateActorDto } from './dto/create-actor.dto';

@Injectable()
export class ActorService {
  constructor(
    @InjectRepository(ActorEntity)
    private actorRepository: Repository<ActorEntity>,
  ) {}

  async findById(id: string): Promise<ActorEntity> {
    const actor = await this.actorRepository.findOneBy({ id });

    if (!actor) {
      throw new NotFoundException(`Actor with ID ${id} not found`);
    }

    return actor;
  }

  async create(dto: CreateActorDto): Promise<ActorEntity> {
    const existingActor = await this.actorRepository.findOneBy({
      name: dto.name,
    });

    if (existingActor) {
      throw new BadRequestException(
        `Actor with name ${dto.name} already exists`,
      );
    }

    const actor = this.actorRepository.create(dto);
    return this.actorRepository.save(actor);
  }
}

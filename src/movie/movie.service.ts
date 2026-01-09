import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MovieEntity } from './entitiies/movie.entity';
import { In, Not, Repository } from 'typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';
import { ActorEntity } from 'src/actor/entities/actor.entitie';
import { MoviePosterEntity } from './entitiies/poster.entity';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(MovieEntity) // inject repository
    private readonly movieRepository: Repository<MovieEntity>,
    @InjectRepository(ActorEntity)
    private readonly actorRepository: Repository<ActorEntity>,
    @InjectRepository(MoviePosterEntity)
    private readonly moviePosterRepository: Repository<MoviePosterEntity>,
  ) {}

  async findAll(): Promise<MovieEntity[]> {
    return await this.movieRepository.find({
      //   where: { isPublic: true },
      order: {
        createdAt: 'DESC',
      },
      cache: 3000, // 3 seconds
    });
  }

  async findById(id: string): Promise<MovieEntity> {
    const movie = await this.movieRepository.findOne({
      where: { id },
      relations: ['actors', 'poster'],
    });

    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found`);
    }
    return movie;
  }

  async create(dto: CreateMovieDto): Promise<MovieEntity> {
    const { actorsIds, imageUrl } = dto;
    const actors = await this.actorRepository.findBy({
      id: In(actorsIds),
    });

    if (actors.length === 0) {
      throw new NotFoundException(
        `No actors found with IDs ${actorsIds.join(', ')}`,
      );
    }

    let poster: MoviePosterEntity | null = null;

    if (imageUrl) {
      poster = this.moviePosterRepository.create({ url: imageUrl });
      await this.moviePosterRepository.save(poster);
    }

    const newMovie = this.movieRepository.create({ ...dto, actors, poster });
    return await this.movieRepository.save(newMovie);
  }

  async update(id: string, dto: Partial<MovieEntity>): Promise<MovieEntity> {
    const movie = await this.findById(id);
    Object.assign(movie, dto);
    return await this.movieRepository.save(movie);
  }

  async delete(id: string): Promise<string> {
    const movie = await this.findById(id);
    await this.movieRepository.remove(movie);
    return movie.id;
  }
}

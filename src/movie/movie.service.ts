import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MovieEntity } from './entitiies/movie.entity';
import { Not, Repository } from 'typeorm';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(MovieEntity) // inject repository
    private readonly movieRepository: Repository<MovieEntity>,
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

  async findById(id: number): Promise<MovieEntity> {
    const movie = await this.movieRepository.findOneBy({ id });

    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found`);
    }
    return movie;
  }

  async create(dto: Partial<MovieEntity>): Promise<MovieEntity> {
    const newMovie = this.movieRepository.create(dto);
    return await this.movieRepository.save(newMovie);
  }

  async update(id: number, dto: Partial<MovieEntity>): Promise<MovieEntity> {
    const movie = await this.findById(id);
    Object.assign(movie, dto);
    return await this.movieRepository.save(movie);
  }

  async delete(id: number): Promise<number> {
    const movie = await this.findById(id);
    await this.movieRepository.remove(movie);
    return movie.id;
  }
}

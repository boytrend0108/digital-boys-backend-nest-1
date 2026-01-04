import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieEntity } from './entitiies/movie.entity';
import { ActorEntity } from 'src/actor/entities/actor.entitie';
import { MoviePosterEntity } from './entitiies/poster.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([MovieEntity, ActorEntity, MoviePosterEntity]),
  ], // register entity
  controllers: [MovieController],
  providers: [MovieService],
})
export class MovieModule {}

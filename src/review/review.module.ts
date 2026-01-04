import { Module } from '@nestjs/common';
import { ReviewController } from './review.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewEntity } from './entities/review.entity';
import { ReviewService } from './review.service';
import { MovieService } from 'src/movie/movie.service';
import { MovieEntity } from 'src/movie/entitiies/movie.entity';
import { ActorEntity } from 'src/actor/entities/actor.entitie';
import { MoviePosterEntity } from 'src/movie/entitiies/poster.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ReviewEntity,
      MovieEntity,
      ActorEntity,
      MoviePosterEntity,
    ]),
  ],
  controllers: [ReviewController],
  providers: [ReviewService, MovieService],
})
export class ReviewModule {}

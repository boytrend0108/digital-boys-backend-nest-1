import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ReviewEntity } from './entities/review.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MovieService } from 'src/movie/movie.service';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(ReviewEntity)
    private reviewRepository: Repository<ReviewEntity>,
    private movieService: MovieService,
  ) {}

  async create(createReviewDto: CreateReviewDto): Promise<ReviewEntity> {
    const { text, rating, movieId } = createReviewDto;
    const movie = await this.movieService.findById(movieId);

    const review = this.reviewRepository.create({
      text,
      rating,
      movie,
    });

    return this.reviewRepository.save(review);
  }

  async findAll(): Promise<ReviewEntity[]> {
    return this.reviewRepository.find();
  }

  // findOne(id: number): Promise<ReviewEntity> {
  //   return `This action returns a #${id} review`;
  // }

  update(id: number, updateReviewDto: UpdateReviewDto) {
    return `This action updates a #${id} review`;
  }

  remove(id: number) {
    return `This action removes a #${id} review`;
  }
}

import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { MovieService } from './movie.service';

// @Controller('api/movie')
@Controller({
  path: 'movie',
  // hosts: ['api.example.com']
})
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  findAll(@Query('genre') genre: string) {
    console.log('>>>>>>>', genre);
    return genre
      ? `Movies in genre: ${genre}`
      : [
          { id: 1, title: 'Inception', genre: 'Sci-Fi' },
          { id: 2, title: 'The Dark Knight', genre: 'Action' },
          { id: 3, title: 'Interstellar', genre: 'Sci-Fi' },
        ];
  }

  @Post()
  create(@Body() body: { title: string; genre: string }) {
    return `This action adds a new movie: ${body.title} (${body.genre})`;
  }

  @Get('headers')
  getHeaders(@Headers() headers: Record<string, string>) {
    console.log('Headers:', headers);
    return headers;
  }

  @Get('user-agent')
  getUserAgent(@Headers('user-agent') userAgent: string) {
    console.log('User-Agent:', userAgent);
    return userAgent;
  }
}

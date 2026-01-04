import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  IsUUID,
  Max,
  Min,
} from 'class-validator';

export class CreateMovieDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsUrl()
  imageUrl: string;

  @IsInt()
  @IsNotEmpty()
  @Min(1888)
  @Max(new Date().getFullYear())
  releaseDate: number;

  @IsArray()
  @IsUUID('4', { each: true })
  actorsIds: string[];
}

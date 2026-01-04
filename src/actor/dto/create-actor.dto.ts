import { IsString, Length } from 'class-validator';

export class CreateActorDto {
  @IsString()
  @Length(2, 50)
  name: string;
}

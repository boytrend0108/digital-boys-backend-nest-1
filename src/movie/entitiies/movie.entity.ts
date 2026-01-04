import { ActorEntity } from 'src/actor/entities/actor.entitie';
import { ReviewEntity } from 'src/review/entities/review.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MoviePosterEntity } from './poster.entity';

enum Genre {
  ACTION = 'Action',
  DRAMA = 'Drama',
}
@Entity({
  name: 'movies',
})
export class MovieEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 120, unique: true, type: 'varchar' })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ default: false, type: 'boolean', name: 'is_available' })
  isAvailable: boolean;

  @Column({
    type: 'decimal',
    unsigned: true,
    precision: 3,
    scale: 2,
    default: 0,
  })
  rating: number;

  @Column({ type: 'enum', enum: Genre, default: Genre.DRAMA })
  genre: Genre;

  @Column({ type: 'uuid', name: 'poster_id', nullable: true })
  posterId: string;

  @Column({ type: 'int', nullable: true, unsigned: true, name: 'release_date' }) // unsigned: true === positive number
  releaseDate: number;

  @OneToMany(() => ReviewEntity, (review) => review.movie)
  reviews: ReviewEntity[];

  @ManyToMany(() => ActorEntity, (actor) => actor.movies)
  @JoinTable({
    name: 'movie_actors',
    joinColumn: { name: 'movie_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'actor_id', referencedColumnName: 'id' },
  })
  actors: ActorEntity[];

  @OneToOne(() => MoviePosterEntity, (poster) => poster.movie, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'poster_id' })
  poster: MoviePosterEntity | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

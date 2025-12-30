import {
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  Length,
  IsNumber,
  IsInt,
  IsArray,
  IsEnum,
  Matches,
  isURL,
  IsUrl,
  IsUUID,
} from 'class-validator';

export enum TaskTag {
  WORK = 'work',
  PERSONAL = 'personal',
  URGENT = 'urgent',
  LOW_PRIORITY = 'low_priority',
}

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  // @MinLength(2)
  // @MaxLength(10)
  @Length(2, 10)
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsNotEmpty()
  @IsOptional()
  // @IsNumber()
  @IsInt()
  @IsPositive()
  priority: number;

  @IsArray()
  // @IsString({ each: true, message: 'Each tag must be a string' })
  @IsEnum(TaskTag, {
    each: true,
    message: 'Each tag must be a valid enum value',
  })
  @IsOptional()
  tags: TaskTag[];

  @IsString()
  @IsNotEmpty()
  @Length(8, 20)
  @Matches(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/, {
    message:
      'Password must be at least 8 characters long, contain at least one uppercase letter and one number',
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  @IsUrl({
    protocols: ['http', 'https'],
    require_tld: true,
    require_protocol: true,
    require_valid_protocol: true,
    require_host: true,
    require_port: false,
    allow_underscores: false,
    allow_trailing_dot: false,
    allow_protocol_relative_urls: false,
    host_whitelist: [],
    host_blacklist: [],
  })
  url: string;

  @IsUUID('all') // all versions of UUID
  id: string;
}

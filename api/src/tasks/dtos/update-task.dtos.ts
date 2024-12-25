import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDateString, IsString } from 'class-validator';

export class UpdateTaskDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty({ required: false, type: [String] })
  @IsArray()
  @IsString({ each: true, message: 'Each tag should be a string' })
  assigned: string[];

  @ApiProperty({
    required: true,
    type: String,
    description: 'Start date of the task',
  })
  @IsDateString()
  startDate: string;

  @ApiProperty({
    required: true,
    type: String,
    description: 'End date of the task',
  })
  @IsDateString()
  endDate: string;
}

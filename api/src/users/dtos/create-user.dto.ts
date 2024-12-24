import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserType } from 'src/enums/user-type/user-type.enum';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  userName: string;

  @ApiProperty()
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({
    description: 'User role, can be "1" for Admin or "2" for User',
    enum: UserType,
    required: false, // Make it optional
  })
  @IsOptional()
  @IsEnum(UserType, {
    message: 'User role must be either "1" (Admin) or "2" (User)',
  })
  userType?: UserType;
}

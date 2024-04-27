import { IsString, IsArray, IsPhoneNumber, IsNotEmpty, IsEmail, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UpdateUserInterface } from '../interfaces';

export class UpdateUserDto implements Omit<UpdateUserInterface, 'id'> {
  @ApiProperty({
    example: 'John',
    required: false,
  })
  @IsOptional()
  @IsString()
  first_name?: string;

  @ApiProperty({
    example: 'Doe',
    required: false,
  })
  @IsString()
  @IsOptional()
  last_name?: string;

  @ApiProperty({
    example: 'Tashkent, Uzbekistan',
    required: false,
  })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiProperty({
    example: 'qwerty123',
    required: false,
  })
  @IsOptional()
  @IsString()
  password?: string;

  @ApiProperty({
    example: '+998977777777',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsPhoneNumber("UZ")
  phone: string;

  @ApiProperty({
    example: 'JohnDoe77@gmail.com',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    maxItems: 8,
    format: 'binary',
    type: 'string',
  })
  image: any;
}

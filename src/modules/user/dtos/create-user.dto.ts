import { IsString, IsArray, IsPhoneNumber, IsNotEmpty, IsEmail, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateUserInterface } from '../interfaces';

export class CreateUserDto implements CreateUserInterface {
  @ApiProperty({
    example: 'John',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @ApiProperty({
    example: 'Doe',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  last_name: string;

  @ApiProperty({
    example: 'Tashkent, Uzbekistan',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    example: 'qwerty123',
    required: false,
  })
  @IsOptional()
  @IsString()
  password?: string;

  @ApiProperty({
    example: '+998977777777',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber("UZ")
  phone: string;

  @ApiProperty({
    example: 'JohnDoe77@gmail.com',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    maxItems: 8,
    format: 'binary',
    type: 'string',
  })
  @IsOptional()
  image?: any;
}

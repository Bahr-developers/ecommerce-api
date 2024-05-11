import { IsOptional, IsNumber, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UpdateOrderInterface } from '../interfaces';
import { $Enums } from '@prisma/client';

export class UpdateOrderDto implements Omit<UpdateOrderInterface, 'id'> {
  @ApiProperty({
    example: $Enums.Status,
    required: true,
  })
  @IsEnum($Enums.Status)
  status: $Enums.Status;
}

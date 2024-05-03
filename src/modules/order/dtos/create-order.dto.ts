import { IsString, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateOrderInterface, CreateOrderItemInterface, CreateShipmentInterface } from '../interfaces';

export class CreateOrderDto implements CreateOrderInterface {
  @ApiProperty({
    example: '{"address":"Uzbekistan, Tashkent", "region":"Tashkent", "district":"Shamsobod", "customer_id":"660d5290e49538271705501e"}',
    required: true,
  })
  shipment: CreateShipmentInterface;

  @ApiProperty({
    example: '[{"product_id":"660d5290e49538271705501e", "quantity": 10}]',
    type: 'array',
  })
  orderItem: CreateOrderItemInterface[];
}
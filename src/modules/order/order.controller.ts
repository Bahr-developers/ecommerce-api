import {
    Body,
    Controller,
    Delete,
    Get,
    Headers,
    Param,
    Patch,
    Post,
    Query,
    UploadedFile,
    UseInterceptors,
  } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
  import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
  import { Category, Order } from '@prisma/client';
import { CreateOrderDto, UpdateOrderDto } from './dtos';
import { GetFilteredOrderesRequest } from './interfaces';
import { OrderService } from './order.service';
  
  @ApiBearerAuth("JWT")
  @ApiTags('Order')
  @Controller({
    path: 'order',
    version: '1.0',
  })
  export class OrderController {
    #_service: OrderService;
  
    constructor(service: OrderService) {
      this.#_service = service;
    }
  
    @Get('find/all')
    async getOrderList(
      @Query('page') page?: number,
      @Query('limit') limit?: number,
    ): Promise<Order[]> {
      return await this.#_service.getOrderList(page, limit);
    }
  
  
    @Get('find/:id')
    async getOrdersByUserId(
      @Param('id') userId:string
    ): Promise<Order[]> {
      return await this.#_service.getOrdersByUserId(userId);
    }
  
    @Get('filter')
    async getFilteredOrderList(
      @Body() payload:GetFilteredOrderesRequest
    ): Promise<Order[]> {
      return await this.#_service.getFilteredOrderList({...payload});
    }
  
    @Post('add')
    async createOrder(
        @Body() payload: CreateOrderDto,
        ): Promise<void> {
      await this.#_service.createOrder({...payload});
    }

    @Patch('edit/:id')
    async updateCategory(
      @Param('id') orderId: string,
      @Body() payload: UpdateOrderDto,
    ): Promise<void> {
      await this.#_service.updateOrder({
        ...payload,
        id: orderId,
      });
    }
  
    @Delete('delete/:id')
    async deleteOrder(@Param('id') id: string): Promise<void> {
      await this.#_service.deleteOrder(id);
    }
}
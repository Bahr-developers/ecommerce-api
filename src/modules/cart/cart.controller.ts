import {
    Body,
    Controller,
    Delete,
    Get,
    Headers,
    Param,
    Patch,
    Post,
  } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Cart, Category, Wishlist } from '@prisma/client';
import { CartService } from './cart.service';
import { CreateCartDto, UpdateCartDto } from './dtos';
  
  @ApiBearerAuth("JWT")
  @ApiTags('Cart')
  @Controller({
    path: 'cart',
    version: '1.0',
  })
  export class CartController {
    #_service: CartService;
  
    constructor(service: CartService) {
      this.#_service = service;
    }
  
    @Get('find/all')
    async getCart(
    ): Promise<Cart[]> {
      return await this.#_service.getCart();
    }
  
    @Post('add')
    async createCart(
        @Body() payload: CreateCartDto,
        ): Promise<void> {
      await this.#_service.createCart({...payload});
    }
  
    @Patch('edit/:id')
    async updateCart(
        @Param('id') id:string,
        @Body() payload: UpdateCartDto,
        ): Promise<void> {
      await this.#_service.updateCart({...payload, id});
    }

    @Delete('delete/:id')
    async deleteCart(@Param('id') id: string): Promise<void> {
      await this.#_service.deleteCart(id);
    }
}
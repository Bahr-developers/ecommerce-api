import {
    Body,
    Controller,
    Delete,
    Get,
    Headers,
    Param,
    Post,
  } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
  import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
  import { Category, Wishlist } from '@prisma/client';
import { CreateWishlistDto } from './dtos';
import { WishlistService } from './wishlist.service';
  
  @ApiBearerAuth("JWT")
  @ApiTags('Wishlist')
  @Controller({
    path: 'wishlist',
    version: '1.0',
  })
  export class WishlistController {
    #_service: WishlistService;
  
    constructor(service: WishlistService) {
      this.#_service = service;
    }
  
    @Get('find/all')
    async getWishlist(
    ): Promise<Wishlist[]> {
      return await this.#_service.getWishlist();
    }
  
    @Post('add')
    async createWishlist(
        @Body() payload: CreateWishlistDto,
        ): Promise<void> {
      await this.#_service.createWishlist({...payload});
    }

  
    @Delete('delete/:id')
    async deleteCategory(@Param('id') id: string): Promise<void> {
      await this.#_service.deleteCategory(id);
    }
}
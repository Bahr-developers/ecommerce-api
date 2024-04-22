import {
    Body,
    Controller,
    Delete,
    Get,
    Headers,
    Param,
    Patch,
    Post,
    UploadedFile,
    UseInterceptors,
  } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
  import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
  import { Category } from '@prisma/client';
import { CategoryService } from './category.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dtos';
import { FileType } from './interfaces';
  
  @ApiBearerAuth("JWT")
  @ApiTags('Category')
  @Controller({
    path: 'category',
    version: '1.0',
  })
  export class CategoryController {
    #_service: CategoryService;
  
    constructor(service: CategoryService) {
      this.#_service = service;
    }
  
    @Get('find/all')
    async getTranslateList(
    @Headers('accept-language') languageCode: string,
    ): Promise<Category[]> {
      return await this.#_service.getCategoryList(languageCode);
    }
  
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('image'))
    @Post('add')
    async createTranslate(
        @Body() payload: CreateCategoryDto,
        @UploadedFile() image: FileType,
        ): Promise<void> {
      await this.#_service.createCategory({...payload, image});
    }

    @ApiConsumes('multipart/form-data')
    @Patch('edit/:id')
    @UseInterceptors(FileInterceptor('image'))
    async updateCategory(
      @Param('id') restourantId: string,
      @Body() payload: UpdateCategoryDto,
      @UploadedFile() image: any,
    ): Promise<void> {
      await this.#_service.updateCategory({
        ...payload,
        id: restourantId,
        image,
      });
    }
  
    @Delete('delete/:id')
    async deleteCategory(@Param('id') id: string): Promise<void> {
      await this.#_service.deleteCategory(id);
    }
}
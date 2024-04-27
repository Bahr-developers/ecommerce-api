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
  import { Category, User } from '@prisma/client';
import { FileType } from '../category/interfaces';
import { CreateUserDto } from './dtos';
import { UserService } from './user.service';
  
  @ApiBearerAuth("JWT")
  @ApiTags('User')
  @Controller({
    path: 'user',
    version: '1.0',
  })
  export class UserController {
    #_service: UserService;
  
    constructor(service: UserService) {
      this.#_service = service;
    }
  
    @Get('find/all')
    async getTranslateList(
    ): Promise<User[]> {
      return await this.#_service.getUserList();
    }
  
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('image'))
    @Post('add')
    async createTranslate(
        @Body() payload: CreateUserDto,
        @UploadedFile() image: FileType,
        ): Promise<void> {
      await this.#_service.createUser({...payload, image});
    }

    // @ApiConsumes('multipart/form-data')
    // @Patch('edit/:id')
    // @UseInterceptors(FileInterceptor('image'))
    // async updateCategory(
    //   @Param('id') restourantId: string,
    //   @Body() payload: UpdateCategoryDto,
    //   @UploadedFile() image: any,
    // ): Promise<void> {
    //   await this.#_service.updateCategory({
    //     ...payload,
    //     id: restourantId,
    //     image,
    //   });
    // }
  
    // @Delete('delete/:id')
    // async deleteCategory(@Param('id') id: string): Promise<void> {
    //   await this.#_service.deleteCategory(id);
    // }
}
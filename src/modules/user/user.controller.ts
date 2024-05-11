import {
    Body,
    Controller,
    Delete,
    Get,
    Headers,
    Param,
    Patch,
    Post,
    Req,
    UploadedFile,
    UseInterceptors,
  } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
  import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
  import { Category, User } from '@prisma/client';
import { FileType } from '../category/interfaces';
import { CreateUserDto, UpdateUserDto } from './dtos';
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
    async getUserList(
    ): Promise<User[]> {
      return await this.#_service.getUserList();
    }

    @Get('/single')
    async getSingleUser(@Req() req: any): Promise<any> {
      return await this.#_service.getSingleUser(req.userId);
    }
  
    @Get('/single/user/by/:userId')
    async getSingleUserByUserID(@Param("userId") userId: string): Promise<User> {
      return await this.#_service.getSingleUser(userId);
    }
  
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('image'))
    @Post('add')
    async createUser(
        @Body() payload: CreateUserDto,
        @UploadedFile() image: FileType,
        @Req() req: any
        ): Promise<void> {
      await this.#_service.createUser({...payload, image}, req.userId);
    }

    @ApiConsumes('multipart/form-data')
    @Patch('edit/:id')
    @UseInterceptors(FileInterceptor('image'))
    async updateUser(
      @Param('id') userId: string,
      @Body() payload: UpdateUserDto,
      @UploadedFile() image: any,
      @Req() req: any
    ): Promise<void> {
      await this.#_service.updateUser({
        id: userId,
        ...payload,
        image,
      }, req.userId);
    }
  
    @Delete('delete/:id')
    async deleteUser(@Param('id') id: string): Promise<void> {
      await this.#_service.deleteUser(id);
    }
}
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
  import { TranslateService } from './translate.service';
  import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
  import { CreateTranslateDto, UpdateTranslateDto } from './dtos';
  import { Translate } from '@prisma/client';
  import { GetSingleTranslateResponse } from './interfaces';
  
  @ApiBearerAuth("JWT")
  @ApiTags('Translate')
  @Controller({
    path: 'translate',
    version: '1.0',
  })
  export class TranslateController {
    #_service: TranslateService;
  
    constructor(service: TranslateService) {
      this.#_service = service;
    }
  
    @Get('find/all')
    async getTranslateList(): Promise<Translate[]> {
      return await this.#_service.getTranslateList();
    }
  
    @Get('/unused')
    async getUnusedTranslateList(): Promise<Translate[]> {
      return await this.#_service.getUnusedTranslateList();
    }
  
    @Get('find/:id')
    async retrieveSingleTranslate(
      @Headers('accept-language') languageCode: string,
      @Param('id') translateId: string,
    ): Promise<GetSingleTranslateResponse> {
      return await this.#_service.getSingleTranslate({
        languageCode,
        translateId,
      });
    }
  
    @Post('add')
    async createTranslate(@Body() payload: CreateTranslateDto): Promise<void> {
      await this.#_service.createTranslate(payload);
    }
  
    @Patch('edit/:id')
    async updateTranslate(
      @Param('id') translateId: string,
      @Body() payload: UpdateTranslateDto,
    ): Promise<void> {
      await this.#_service.updateTranslate({ ...payload, id: translateId });
    }
  
    @Delete('delete/:id')
    async deleteTranslate(@Param('id') translateId: string): Promise<void> {
      await this.#_service.deleteTranslate(translateId);
    }
  }
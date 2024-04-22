import { LanguageService } from './language.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateLanguageDto, UpdateLanguageDto } from './dtos';
import { Language } from '@prisma/client';

@ApiTags('Language')
@Controller({
  path: 'language',
  version: '1.0',
})
export class LanguageController {
  #_service: LanguageService;

  constructor(service: LanguageService) {
    this.#_service = service;
  }

  @Get()
  async getLanguageList(): Promise<Language[]> {
    return await this.#_service.getLanguageList();
  }

  @Post('add')
  async createLanguage(@Body() payload: CreateLanguageDto): Promise<void> {
    await this.#_service.createLanguage(payload);
  }

  @Patch('edit/:id')
  async updateLanguage(
    @Body() payload: UpdateLanguageDto,
    @Param('id') id: string,
  ): Promise<void> {
    await this.#_service.updateLanguage({ id, ...payload });
  }

  @Delete('delete/:id')
  async deleteLanguage(@Param('id') id: string): Promise<void> {
    await this.#_service.deleteLanguage(id);
  }
}
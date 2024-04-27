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
  import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
  import { Properties } from '@prisma/client';
import { CreatePropertiesDto, UpdatePropertiesDto } from './dtos';
import { PropertyService } from './properties.service';
  
  @ApiBearerAuth("JWT")
  @ApiTags('Property')
  @Controller({
    path: 'property',
    version: '1.0',
  })
  export class PropertyController {
    #_service: PropertyService;
  
    constructor(service: PropertyService) {
      this.#_service = service;
    }
  
    @Get('find/all')
    async getPropertyList(
    @Headers('accept-language') languageCode: string,
    ): Promise<Properties[]> {
      return await this.#_service.getPropertyList(languageCode);
    }
  
    @Get('find/:id')
    async getSingleProperty(
    @Param('id') categoryId:string,
    @Headers('accept-language') languageCode: string,
    ): Promise<Properties[]> {
      return await this.#_service.getSingleProperty(languageCode, categoryId);
    }
  
    @Post('add')
    async createProperty(
        @Body() payload: CreatePropertiesDto,
        ): Promise<void> {
      await this.#_service.createProperty({...payload});
    }

    async updateProperties(
      @Param('id') propertyId: string,
      @Body() payload: UpdatePropertiesDto,
    ): Promise<void> {
      await this.#_service.updateProperties({
        ...payload,
        id: propertyId
    });
    }
  
    @Delete('delete/:id')
    async deleteProperty(@Param('id') id: string): Promise<void> {
      await this.#_service.deleteProperty(id);
    }
}
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
  import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
  import { Model, Properties } from '@prisma/client';
import { CreateModelDto, UpdateModelDto } from './dtos';
import { ModelService } from './model.service';
  
  @ApiBearerAuth("JWT")
  @ApiTags('Model')
  @Controller({
    path: 'model',
    version: '1.0',
  })
  export class ModelController {
    #_service: ModelService;
  
    constructor(service: ModelService) {
      this.#_service = service;
    }
  
    @Get('find/all')
    async getModelList(
    ): Promise<Model[]> {
      return await this.#_service.getModelList();
    }
  
    @Get('find/:id')
    async getSingleModel(
    @Param('id') modelId:string,
    ): Promise<Model[]> {
      return await this.#_service.getSingleModel(modelId);
    }
  
    @Post('add')
    async createModel(
        @Body() payload: CreateModelDto,
        ): Promise<void> {
      await this.#_service.createModel({...payload});
    }

    @Patch('edit/:id')
    async updateModel(
      @Param('id') propertyId: string,
      @Body() payload: UpdateModelDto,
    ): Promise<void> {
      await this.#_service.updateModel({
        ...payload,
        id: propertyId
    });
    }
  
    @Delete('delete/:id')
    async deleteModel(@Param('id') id: string): Promise<void> {
      await this.#_service.deleteModel(id);
    }
}
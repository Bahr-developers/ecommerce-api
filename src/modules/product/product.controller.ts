import {
    Body,
    Controller,
    Post,
    Get,
    Patch,
    Param,
    Delete,
    Headers,
    UseInterceptors,
    UploadedFiles,
    Query,
    UploadedFile,
  } from '@nestjs/common';
  import { ApiConsumes, ApiTags } from '@nestjs/swagger';
  import { FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ProductService } from './product.service';
import { CreateProductDto, DeleteProductVideoDto, UpdateProductDto } from './dtos';
import { FileType } from '../category/interfaces';
import { Product } from '@prisma/client';
import { AddOneProductImageDto } from './dtos/add-one-product-image.dto';
import { DeleteProductImageDto } from './dtos/delete-one-product-image.dto';
  
  @ApiTags('Product')
  @Controller({
    path: 'product',
    version: '1.0',
  })
  export class ProductController {
    #_productService: ProductService;
  
    constructor(product: ProductService) {
      this.#_productService = product;
    }
  
    @Get('find/all')
    async getProductList(
      @Headers('accept-language') languageCode: string,
    ): Promise<Product[]> {
      return await this.#_productService.getProductList(languageCode);
    }
  
    @Get('find/one/:id')
    async getSingleProduct(
      @Headers('accept-language') languageCode: string,
      @Param('id') id:string
    ): Promise<Product> {
      return await this.#_productService.getSingleProduct(languageCode, id);
    }
  
    @Get('/search')
    async searchProduct(
      @Headers('accept-language') languageCode: string,
      @Query('title') title: string,
    ): Promise<Product[]> {
      return await this.#_productService.searchProduct({
        title,
        languageCode,
      });
    }
  

    @ApiConsumes('multipart/form-data')
    @Post('add')
    @UseInterceptors(
      FileFieldsInterceptor([
        { name: 'images', maxCount: 10 },
        { name: 'video' },
      ]),
    )
    async createProduct(
      @Body() payload: CreateProductDto,
      @UploadedFiles() files: { images: FileType[]; video: FileType },
    ): Promise<void> {
      return this.#_productService.createProduct({ ...payload, ...files });
    }
  
    @ApiConsumes('multipart/form-data')
    @Post('add/one/product-image')
    @UseInterceptors(FileInterceptor('image'))
    async addOneProductImage(
      @Body() payload: AddOneProductImageDto,
      @UploadedFile() image: any,
    ) {
      await this.#_productService.addOneProductImage({ image, ...payload });
    }
  
    @ApiConsumes('multipart/form-data')
    @Post('add/one/product-video')
    @UseInterceptors(FileInterceptor('video'))
    async addOneProductVideo(
      @Body() payload: AddOneProductImageDto,
      @UploadedFile() video: any,
    ) {
      await this.#_productService.addOneProductVideo({ video, ...payload });
    }
  
    @Patch('edit/:id')
    async updateFood(
      @Param('id') productId: string,
      @Body() payload: UpdateProductDto,
    ): Promise<void> {
      await this.#_productService.updateProduct({ ...payload, id: productId });
    }
  
    @Delete('delete/product-image')
    async deleteOneProductImage(@Body() payload: DeleteProductImageDto): Promise<void> {
      await this.#_productService.deleteOneProductImage(payload);
    }
  
    @Delete('delete/product-video')
    async deleteOneProductVideo(@Body() payload: DeleteProductVideoDto): Promise<void> {
      await this.#_productService.deleteOneProductVideo(payload);
    }
  
    @Delete('delete/:id')
    async deleteProduct(@Param('id') foodId: string): Promise<void> {
      await this.#_productService.deleteProduct(foodId);
    }
  }
  
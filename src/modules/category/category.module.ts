import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { MinioService } from '../../client';
import { TranslateController } from '../translate/translate.controller';
import { TranslateService } from '../translate/translate.service';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';

@Module({
  controllers: [CategoryController],
  providers: [PrismaService, CategoryService, MinioService, TranslateService],
})
export class CategoryModule {}
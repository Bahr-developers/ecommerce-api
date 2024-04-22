import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MinioModule } from './client';
import { databaseConfig } from './config';
import { minioConfig } from './config/minio.config';
import { CategoryModule } from './modules/category/category.module';
import { LanguageModule } from './modules/language/language.module';
import { TranslateModule } from './modules/translate/translate.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, minioConfig]
    }),
    LanguageModule,
    TranslateModule,
    MinioModule,
    CategoryModule
  ],
})
export class AppModule {}

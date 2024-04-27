import {
    ConflictException,
    Injectable
  } from '@nestjs/common';
  import { PrismaService } from '../../prisma';
  import { TranslateService } from '../translate/translate.service';
  import { Properties, User } from '@prisma/client';
import { CreateUserInterface } from './interfaces';
import { MinioService } from '../../client';
  
  @Injectable()
  export class UserService {
      #_prisma: PrismaService;
      #_service: TranslateService;
      #_minio: MinioService;
    
      constructor(prisma: PrismaService, service:TranslateService, minio: MinioService) {
        this.#_prisma = prisma;
        this.#_service = service;
        this.#_minio = minio;
      }
  
    async createUser(payload: CreateUserInterface): Promise<void> {
        let image = ''

        if(payload.image){
          const file = await this.#_minio.uploadFile({
            file: payload.image,
            bucket: 'shop',
          });
          image = file.fileName
        }
      await this.#_prisma.user.create({
          data: {
              first_name: payload.first_name,
              last_name: payload.last_name,
              email: payload.email,
              phone: payload.phone,
              address: payload.address,
              image:image
          },
            })
    }
  
    async getUserList(): Promise<User[]> {
      const data = await this.#_prisma.user.findMany()
  
      return data
  }
  
    // async updateProperties(payload: UpdatePropertiesInterface): Promise<void> {
    //   await this.#_checkProperty(payload.id);    
    //   if(payload.name){
    //     await this.checkTranslate(payload.name);
    //     await this.#_prisma.category.update({
    //       where:{id:payload.id}, 
    //       data:{name:payload.name
    //     }})
    //     await this.#_prisma.translate.update({
    //       where:{id: payload.name},
    //       data:{status: 'active'}
    //     }
    //     );
    //   }
    // }
  
    // async deleteProperty(id: string): Promise<void> {
    //   await this.#_checkProperty(id);
    //   const updateProperty = await this.#_prisma.category.findFirst({where:{id:id}});
    //       await this.#_prisma.translate.update(
    //         {where:{id: updateProperty.name,},
    //         data:{status: 'inactive'}}
    //       );
    //       await this.#_prisma.category.delete({ where:{id: id} });
    // }
  
    async #_checkProperty(id: string): Promise<void> {
      const properties = await this.#_prisma.properties.findFirst({where:{id:id}});
  
      if (!properties) {
        throw new ConflictException(`Properties with ${id} is not exists`);
      }
    }
  
    async checkTranslate(id: string): Promise<void> {
      const translate = await this.#_prisma.translate.findFirst({where:{id:id}});
  
      if (!translate) {
        throw new ConflictException(`Translate with ${id} is not exists`);
      }
    }
  }
  
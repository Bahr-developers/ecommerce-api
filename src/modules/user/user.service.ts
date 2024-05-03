import {
  BadRequestException,
    ConflictException,
    Injectable
  } from '@nestjs/common';
  import { PrismaService } from '../../prisma';
  import { TranslateService } from '../translate/translate.service';
  import { Properties, User } from '@prisma/client';
import { CreateUserInterface, UpdateUserInterface } from './interfaces';
import { MinioService } from '../../client';
import { ProductService } from '../product/product.service';
import * as bcrypt from 'bcrypt'
  
  @Injectable()
  export class UserService {
      #_prisma: PrismaService;
      #_service: TranslateService;
      #_minio: MinioService;
      #_product: ProductService;
    
      constructor(prisma: PrismaService, service:TranslateService, minio: MinioService, product: ProductService) {
        this.#_prisma = prisma;
        this.#_service = service;
        this.#_minio = minio;
        this.#_product = product;
      }
  
     async createUser(payload: CreateUserInterface): Promise<void> {
        let image = ''
        let hashed_password = ''
        let address = ''

        const foundedUser = await this.#_prisma.user.findFirst({where:{phone:payload.phone}})
        if(foundedUser){
          throw new BadRequestException("There is a user with this phone number")
        }

        if(payload.address){
          address = payload.address
        }

        if(payload.password){
          hashed_password = await bcrypt.hash(payload.password, 7)
        }

        if(payload.image){
          const file = await this.#_minio.uploadFile({
            file: payload.image,
            bucket: 'shop',
          });
          image = file.fileName
        }
        if(payload.role){
          await this.#_prisma.user.create({
              data: {
                  first_name: payload.first_name,
                  last_name: payload.last_name,
                  email: payload.email,
                  phone: payload.phone,
                  address: address,
                  password: hashed_password,
                  image:image,
                  role: payload.role
              }})
        }else{
          await this.#_prisma.user.create({
              data: {
                  first_name: payload.first_name,
                  last_name: payload.last_name,
                  email: payload.email,
                  phone: payload.phone,
                  address: address,
                  password: hashed_password,
                  image:image,
              },
                })
        }    
    }
  
    async getUserList(languageCode:string): Promise<User[]> {
      const data = await this.#_prisma.user.findMany({include:{wishlist:true, products:true, cart:true}})
      const result = data
      const products = []
      for(const item of result){
        for(const product of item.products){
          products.push(await this.#_product.getSingleProduct(languageCode, product.id))
        }
        item.products = products
      }
  
      return data
  }
  
  async updateUser(payload: UpdateUserInterface): Promise<void> {
    await this.#_checkUser(payload.id);
    if(payload.first_name){
      await this.#_prisma.user.update({
        where:{ id: payload.id },
        data:{
          first_name: payload.first_name,
        },
        });
      }
    if(payload.last_name){
      await this.#_prisma.user.update({
        where:{ id: payload.id },
        data:{
          last_name: payload.last_name,
        },
        });
      }
    if(payload.phone){
      await this.#_prisma.user.update({
        where:{ id: payload.id },
        data:{
          phone: payload.phone,
        },
        });
      }
    if(payload.address){
      await this.#_prisma.user.update({
        where:{ id: payload.id },
        data:{
          address : payload.address,
        },
        });
      }
    if(payload.email){
      await this.#_prisma.user.update({
        where:{ id: payload.id },
        data:{
          email : payload.email,
        },
        });
      }
    if(payload.address){
      await this.#_prisma.user.update({
        where:{ id: payload.id },
        data:{
          address : payload.address,
        },
        });
      }
    if(payload.password){
    const hashed_password = await bcrypt.hash(payload.password, 7)
      await this.#_prisma.user.update(
       { where:{id:payload.id},
        data:{
          password:hashed_password
        }}
      )
    }
    if(payload.image){
      const foundedProduct = await this.#_prisma.user.findFirst({where:{id:payload.id}});
      if(foundedProduct.image.length){
        await this.#_minio
        .removeFile({ fileName: foundedProduct.image })
        .catch((undefined) => undefined);
      }
      const imageUrl = await this.#_minio.uploadFile({
        file: payload.image,
        bucket: 'shop',
      });

      await this.#_prisma.user.update(
        { where:{id:payload.id},
         data:{
           image:imageUrl.fileName
         }}
       )
    }
  }
  
    async deleteUser(id: string): Promise<void> {
      await this.#_checkUser(id);
      const foundedProduct = await this.#_prisma.user.findFirst({where:{id:id}});
      if(foundedProduct.image.length){
        await this.#_minio
        .removeFile({ fileName: foundedProduct.image })
        .catch((undefined) => undefined);
      }
      await this.#_prisma.user.delete({ where:{id: id} });
    }
  
    async #_checkUser(id: string): Promise<void> {
      const user = await this.#_prisma.user.findFirst({where:{id:id}});
  
      if (!user) {
        throw new ConflictException(`User with ${id} is not exists`);
      }
    }
  
    async checkTranslate(id: string): Promise<void> {
      const translate = await this.#_prisma.translate.findFirst({where:{id:id}});
  
      if (!translate) {
        throw new ConflictException(`Translate with ${id} is not exists`);
      }
    }
  }
  
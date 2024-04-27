import {
  ConflictException,
  Injectable
} from '@nestjs/common';
import { PrismaService } from '../../prisma';
import { TranslateService } from '../translate/translate.service';
import { CreatePropertiesInterface, UpdatePropertiesInterface } from './interfaces';
import { Properties } from '@prisma/client';

@Injectable()
export class PropertyService {
    #_prisma: PrismaService;
    #_service: TranslateService;
  
    constructor(prisma: PrismaService, service:TranslateService) {
      this.#_prisma = prisma;
      this.#_service = service;
    }

  async createProperty(payload: CreatePropertiesInterface): Promise<void> {
    await this.checkTranslate(payload.name);    
    await this.#_prisma.properties.create({
        data: {
            name: payload.name
        },
          });

    await this.#_prisma.translate.update({
        where:{id:payload.name},
        data:{status:"active"}
    }
    );
  }

  async getSingleProperty(languageCode:string, id:string): Promise<Properties[]> {
    await this.#_checkProperty(id)
    const data = await this.#_prisma.properties.findMany()
    let result = [];

    for (let x of data) {
      const property: any = {};

      property.id = x.id;
      const property_name = await this.#_service.getSingleTranslate({
        translateId: x.name.toString(),
        languageCode: languageCode,
      })
      property.name = property_name      

      result.push(property)
    }
    return result
  }

  async getPropertyList(languageCode: string): Promise<Properties[]> {
    const data = await this.#_prisma.properties.findMany()

    let result = [];

    for (let x of data) {
      const property: any = {};

      property.id = x.id;
      const property_name = await this.#_service.getSingleTranslate({
        translateId: x.name.toString(),
        languageCode: languageCode,
    })      
    property.name = property_name.value;  
      result.push(property)
    }
    return result
}

  async updateProperties(payload: UpdatePropertiesInterface): Promise<void> {
    await this.#_checkProperty(payload.id);    
    if(payload.name){
      await this.checkTranslate(payload.name);
      await this.#_prisma.properties.update({
        where:{id:payload.id}, 
        data:{name:payload.name
      }})
      await this.#_prisma.translate.update({
        where:{id: payload.name},
        data:{status: 'active'}
      }
      );
    }
  }

  async deleteProperty(id: string): Promise<void> {
    await this.#_checkProperty(id);
    const updateProperty = await this.#_prisma.properties.findFirst({where:{id:id}});
        await this.#_prisma.translate.update(
          {where:{id: updateProperty.name,},
          data:{status: 'inactive'}}
        );
        await this.#_prisma.category.delete({ where:{id: id} });
  }

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

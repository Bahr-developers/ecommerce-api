import {
    BadRequestException,
    ConflictException,
    Injectable,
    UnprocessableEntityException
  } from '@nestjs/common';
  import { PrismaService } from '../../prisma';
import { CreateOrderInterface, UpdateOrderInterface } from './interfaces';
import { ProductService } from '../product/product.service';
import { UserService } from '../user/user.service';
import { Order } from '@prisma/client';
  
  @Injectable()
  export class OrderService {
      #_prisma: PrismaService;
      #_product: ProductService;
      #_customer: UserService
    
      constructor(prisma: PrismaService, product:ProductService, customer: UserService) {
        this.#_prisma = prisma;
        this.#_product = product;
        this.#_customer = customer;
      }
  
    async createOrder(payload: CreateOrderInterface): Promise<void> {
        if(!payload.shipment.address || typeof(payload.shipment.address)!='string'){
            throw new BadRequestException("Addres must be string")
        }
        if(!payload.shipment.district || typeof(payload.shipment.district)!='string'){
            throw new BadRequestException("District must be string")
        }
        if(!payload.shipment.region || typeof(payload.shipment.region)!='string'){
            throw new BadRequestException("Region must be string")
        }
        if(!payload.shipment.customer_id || typeof(payload.shipment.customer_id)!='string'){
          throw new BadRequestException("Customer ID must be string type")
        }
        if(payload.shipment.zip_code){
          if(typeof(payload.shipment.customer_id)!='string'){
                throw new BadRequestException("Zip Code must be string")
              }
            }
            if(!payload.orderItem){
              throw new BadRequestException("OrderItem is not empty")
            }
            for(const item of payload.orderItem){
              if(!item.quantity || typeof(item.quantity)!='number'){
                throw new BadRequestException("Quantity must be number")
              }
              if(!item.product_id || typeof(item.product_id)!='string'){
                throw new BadRequestException("Product ID must be string")
              }
              await this.#_checkProduct(item.product_id)
            }
            await this.#_checkCustomer(payload.shipment.customer_id)
            let zip_code = ""
            if(payload.shipment.zip_code){
              zip_code = payload.shipment.zip_code
            }

            let total_price = 0
            for(const item of payload.orderItem){
              const product = await this.#_prisma.product.findFirst({where:{id:item.product_id}})
              total_price+=product.price*item.quantity
            }
            console.log(total_price);
            
            const newShipment = await this.#_prisma.shipment.create({data:{
              address:payload.shipment.address,
              district:payload.shipment.district,
              region:payload.shipment.region,
              customer_id:payload.shipment.customer_id,
              zip_code:payload.shipment.zip_code
            }})

            const newOrder = await this.#_prisma.order.create({data:{
              customer_id: payload.shipment.customer_id,
              shipment_id: newShipment.id,
              total_price:total_price
            }})

            for(const item of payload.orderItem){
              const product = await this.#_prisma.product.findFirst({where:{id:item.product_id}})
              const newOrderItem = await this.#_prisma.orderItem.create({data:{
                quantity:item.quantity,
                price:product.price,
                product_id:item.product_id,
                order_id:newOrder.id
              }})
            }
    }
  
  
    async getOrderList(): Promise<Order[]> {
      const data = await this.#_prisma.order.findMany({include:{orderitem:true}})
      return data
  }
  
    async updateOrder(payload: UpdateOrderInterface): Promise<void> {
      await this.#_checkOrder(payload.id)
      await this.#_prisma.order.update({where:{id:payload.id}, data:{status:payload.status}})
    }
  
    async deleteOrder(id: string): Promise<void> {
      await this.#_checkOrder(id);
      const data = await this.#_prisma.order.findFirst({where:{id:id},include:{orderitem:true}})
      await this.#_prisma.shipment.delete({where:{id:data.shipment_id}})
    }
  
    async #_checkProduct(id: string): Promise<void> {
    await this.#_checkId(id)
      const product = await this.#_prisma.product.findFirst({where:{id:id}});
  
      if (!product) {
        throw new ConflictException(`Product with ${id} is not exists`);
      }
    }
  
    async #_checkOrder(id: string): Promise<void> {
    await this.#_checkId(id)
      const order = await this.#_prisma.order.findFirst({where:{id:id}});
  
      if (!order) {
        throw new ConflictException(`Order with ${id} is not exists`);
      }
    }
  
    async #_checkCustomer(id: string): Promise<void> {
    await this.#_checkId(id)
      const customer = await this.#_prisma.user.findFirst({where:{id:id}});
  
      if (!customer) {
        throw new ConflictException(`User with ${id} is not exists`);
      }
    }
  
    async #_checkId(id: string): Promise<void> {
        if (id.length!=36) {
          throw new UnprocessableEntityException(`Invalid ${id} UUID`);
        }
      }

    async checkTranslate(id: string): Promise<void> {
      const translate = await this.#_prisma.translate.findFirst({where:{id:id}});
  
      if (!translate) {
        throw new ConflictException(`Translate with ${id} is not exists`);
      }
    }
  }
  
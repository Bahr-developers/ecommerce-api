export declare interface CreateOrderItemInterface {
    quantity: number;
    product_id: string
}

export declare interface CreateShipmentInterface {
    address: string;
    district: string;
    region: string;
    zip_code?: string;
    customer_id: string;
}



export declare interface CreateOrderInterface {
    shipment: CreateShipmentInterface
    orderItem: CreateOrderItemInterface[]
}
  
export type CartItem = {
    _id: string;
    title: string;
    price: number;
    quantity: number;
    image_url: string;
    userId: string;
  };
  
  export  type Product = {
    _id: string;
    title: string;
    description: string;
    price: number;
    image_url: string;
    inventory: number;
    priceWithoutDiscount: number;
    tags: string[];
    badge: string;
    userId: string;
  };
  
  export type Category = {
    _id: string;
    title: string;
    image_url: string;
  };
  

export type Order = {
    _id: string;
    customer: {
      name: string;
    };
    shipmentId: string;
  };
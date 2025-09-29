export interface ProductDTO {
  _id: string;
  nombre: string;
  descripcionCorta?: string;
  precio: number;
  stock: number;
}

export interface OrderItemDTO {
  productId: string;
  cantidad: number;
}

export interface OrderDTO {
  _id: string;
  userId: string;
  items: OrderItemDTO[];
  total: number;
  createdAt: string;
}

export interface CreateOrderInput {
  userId: string;
  items: { productId: string; cantidad: number }[];
  direccionEnvio?: string;
}

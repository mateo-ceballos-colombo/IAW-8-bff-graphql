import { ProductAPI } from './datasources/productAPI.js';
import { OrderAPI } from './datasources/orderAPI.js';
import { CreateOrderInput } from './types.js';

interface Context {
  productAPI: ProductAPI;
  orderAPI: OrderAPI;
  userId?: string; // derivado de auth (pendiente)
}

export const rootResolver = {
  products: async (args: { search?: string }, context: Context) => {
    return context.productAPI.list(args.search);
  },
  product: async (args: { id: string }, context: Context) => {
    return context.productAPI.get(args.id);
  },
  ordersByUser: async (args: { userId: string }, context: Context) => {
    // En un escenario real, verificar que args.userId === context.userId o rol autorizado
    return context.orderAPI.listByUser(args.userId);
  },
  createOrder: async (args: { input: CreateOrderInput }, context: Context) => {
    // Validación básica de autorización (placeholder)
    if (context.userId && context.userId !== args.input.userId) {
      throw new Error('FORBIDDEN_USER_MISMATCH');
    }
    return context.orderAPI.create(args.input);
  },
};

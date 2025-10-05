import { RestClient } from '../clients/restClient.js';
import { OrderDTO, CreateOrderInput } from '../types.js';

export class OrderAPI {
  constructor(private client: RestClient) {}

  async listByUser(userId: string): Promise<OrderDTO[]> {
    try {
      return await this.client.get<OrderDTO[]>('/api/ordenes', { userId });
    } catch (error: any) {
      // En caso de error, retornar lista vacía
      if (error.response?.status === 400 || error.response?.status === 404) {
        return [];
      }
      // Para otros errores, re-lanzar la excepción
      throw error;
    }
  }

  create(input: CreateOrderInput): Promise<OrderDTO> {
    return this.client.post<OrderDTO>('/api/ordenes', input);
  }
}

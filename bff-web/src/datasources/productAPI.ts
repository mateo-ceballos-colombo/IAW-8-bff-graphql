import { RestClient } from '../clients/restClient.js';
import { ProductDTO } from '../types.js';

export class ProductAPI {
  constructor(private client: RestClient) {}

  list(search?: string): Promise<ProductDTO[]> {
    return this.client.get<ProductDTO[]>('/api/productos', search ? { search } : undefined);
  }

  async get(id: string): Promise<ProductDTO | null> {
    try {
      return await this.client.get<ProductDTO>(`/api/productos/${id}`);
    } catch (error: any) {
      // Si es 404 (no encontrado) o 400 (ID inválido), retornar null
      if (error.response?.status === 404 || error.response?.status === 400) {
        return null;
      }
      // Para otros errores, re-lanzar la excepción
      throw error;
    }
  }
}

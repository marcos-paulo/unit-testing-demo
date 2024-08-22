import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../src/environments/environment';
import { Product } from '../models/product.model';

/**
 * Service for managing products.
 */
@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private baseAPI = environment.baseAPI;
  constructor(private http: HttpClient) {}

  /**
   * Retrieves a list of products.
   * @returns An observable of an array of products.
   */
  getProducts() {
    return this.http.get<Product[]>(`${this.baseAPI}products`);
  }

  /**
   * Saves a new product.
   * @param product - The product to be saved.
   * @returns An observable of the saved product.
   */
  saveProduct(product: Product) {
    return this.http.post<Product>(`${this.baseAPI}products`, product);
  }

  /**
   * Deletes a product by its ID.
   * @param id - The ID of the product to be deleted.
   * @returns An observable of the deleted product.
   */
  deleteProduct(id: number) {
    return this.http.delete<Product>(`${this.baseAPI}products/${id}`);
  }

  /**
   * Updates an existing product.
   * @param product - The updated product.
   * @returns An observable of the updated product.
   */
  updateProduct(product: Product) {
    return this.http.put<Product>(
      `${this.baseAPI}products/${product.id}`,
      product
    );
  }
}

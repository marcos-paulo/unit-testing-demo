import { TestBed } from '@angular/core/testing';

import { ProductsService } from './products.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Product } from 'src/app/models/product.model';

describe('ProductsService', () => {
  let service: ProductsService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ProductsService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should test getProducts', () => {
    const mockProducts: Product[] = [
      {
        id: '1',
        description: 'Product 1',
        price: '10',
        category: 'category1',
        title: 'title1',
      },
      {
        id: '2',
        description: 'Product 2',
        price: '20',
        category: 'category2',
        title: 'title2',
      },
      {
        id: '3',
        description: 'Product 3',
        price: '30',
        category: 'category3',
        title: 'title3',
      },
    ];

    service.getProducts().subscribe((products) => {
      expect(products).toEqual(mockProducts);
    });

    const baseAPI = (service as unknown as { baseAPI: string }).baseAPI;
    const req = httpController.expectOne(`${baseAPI}products`);
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);
  });

  it('should test saveProducts', () => {
    const mockProduct: Product = {
      id: '1',
      description: 'Product 1',
      price: '10',
      category: 'category1',
      title: 'title1',
    };

    service.saveProduct(mockProduct).subscribe((savedProduct) => {
      expect(savedProduct).toEqual(mockProduct);
    });

    const baseAPI = (service as unknown as { baseAPI: string }).baseAPI;
    const req = httpController.expectOne(`${baseAPI}products`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockProduct);
    req.flush(mockProduct);
  });

  it('should test updateProduct', () => {
    const mockProduct: Product = {
      id: '1',
      description: 'Product 1',
      price: '10',
      category: 'category1',
      title: 'title1',
    };

    service.updateProduct(mockProduct).subscribe((updatedProduct) => {
      expect(updatedProduct).toEqual(mockProduct);
    });

    const baseAPI = (service as unknown as { baseAPI: string }).baseAPI;
    const req = httpController.expectOne(
      `${baseAPI}products/${mockProduct.id}`
    );
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(mockProduct);
    req.flush(mockProduct);
  });

  it('should test deleteProduct', () => {
    const mockProduct: Product = {
      id: '1',
      description: 'Product 1',
      price: '10',
      category: 'category1',
      title: 'title1',
    };

    service
      .deleteProduct(parseInt(mockProduct.id ?? '0'))
      .subscribe((deletedProduct) => {
        expect(deletedProduct).toEqual(mockProduct);
      });

    const baseAPI = (service as unknown as { baseAPI: string }).baseAPI;
    const req = httpController.expectOne(
      `${baseAPI}products/${mockProduct.id}`
    );
    expect(req.request.method).toBe('DELETE');
    req.flush(mockProduct);
  });
});

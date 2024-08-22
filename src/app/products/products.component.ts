import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { AddProductComponent } from '../add-product/add-product.component';
import { Product } from '../models/product.model';
import { ProductsService } from '../services/products.service';

/**
 * Represents the Products Component.
 * This component is responsible for displaying and managing the products.
 */
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  /**
   * The array of product data.
   */
  productData!: Product[];

  /**
   * Indicates whether the spinner should be shown.
   */
  showSpinner = false;

  constructor(
    private productService: ProductsService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  /**
   * Retrieves the products from the server.
   * Shows a spinner while loading the data.
   * Displays an error message if something goes wrong.
   */
  getProducts() {
    this.showSpinner = true;
    this.productService.getProducts().subscribe({
      next: (res) => {
        this.productData = res;
        this.showSpinner = false;
      },
      error: (err) => {
        this.showSpinner = false;
        this.snackbar.open('Something went wrong!...', '', {
          duration: 3000,
        });
      },
    });
  }

  /**
   * Opens the dialog to add a new product.
   */
  openDialog() {
    this.dialog.open(AddProductComponent, {
      width: '40%',
    });
  }

  /**
   * Opens the dialog to edit a product.
   * @param product The product to be edited.
   */
  editProduct(product: Product) {
    this.dialog.open(AddProductComponent, {
      data: product,
      width: '40%',
    });
  }

  /**
   * Deletes a product.
   * Displays a success message if the deletion is successful.
   * Displays an error message if something goes wrong.
   * @param product The product to be deleted.
   */
  deleteProduct(product: any) {
    this.productService.deleteProduct(product.id).subscribe({
      next: (res) => {
        this.snackbar.open('Deleted Successfully!...', '', {
          duration: 3000,
        });
      },
      error: (error) => {
        this.snackbar.open('Something went wrong!...', '', {
          duration: 3000,
        });
      },
    });
  }
}

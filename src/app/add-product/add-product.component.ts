import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from '../models/product.model';
import { ProductsService } from '../services/products.service';

/**
 * Represents the component responsible for adding a product.
 */
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {
  productForm!: FormGroup;
  imageSrc!: string;

  constructor(
    private productService: ProductsService,
    private snackbar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) private _data: Product,
    private dialogRef: MatDialogRef<AddProductComponent>
  ) {}

  /**
   * Gets the data of the product.
   */
  public get data(): Product {
    return this._data;
  }

  /**
   * Sets the data of the product.
   * @param d The data of the product.
   */
  public set data(d: Product) {
    this._data = d;
  }

  /**
   * Initializes the component.
   */
  ngOnInit(): void {
    const hasData = this.data && Object.keys(this.data).length;
    this.productForm = new FormGroup({
      title: new FormControl(hasData ? this.data.title : ''),
      description: new FormControl(hasData ? this.data.description : ''),
      price: new FormControl(hasData ? this.data.price : ''),
      category: new FormControl(hasData ? this.data.category : ''),
    });
  }

  /**
   * Saves the product.
   */
  saveProduct() {
    const product = this.productForm.value as Product;
    if (Object.keys(this.data).length) {
      product.id = this.data.id;
      this.productService.updateProduct(product).subscribe({
        next: (res) => {
          this.snackbar.open('Updated Successfully!...', '', {
            duration: 3000,
          });
          this.dialogRef.close();
        },
        error: (error) => {
          this.snackbar.open('Something went wrong!...', '', {
            duration: 3000,
          });
        },
      });
    } else {
      this.productService.saveProduct(product).subscribe({
        next: (res) => {
          this.snackbar.open('Added Successfully!...', '', {
            duration: 3000,
          });
          this.dialogRef.close();
        },
        error: (error) => {
          this.snackbar.open('Something went wrong!...', '', {
            duration: 3000,
          });
        },
      });
    }
  }
}

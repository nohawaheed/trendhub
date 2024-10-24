import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Products } from './../../interface/products';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  constructor(private httpClient: HttpClient) {}

  isLoading: boolean = true;
  errorMessage: string = '';
  products: Products[] = [];
  productSubscription$: Subscription = new Subscription();

  ngOnInit(): void {
    this.productSubscription$ = this.httpClient
      .get<Products[]>('https://fakestoreapi.com/products')
      .subscribe({
        next: (data: Products[]) => {
          this.isLoading = false;
          this.products = data;
        },
        error: (err: HttpErrorResponse) => {
          this.isLoading = false;
          this.errorMessage = err.message;
        },
      });
  }

  addToWishList(product: Products) {
    console.log(product);
  }
  addToCart(product: Products) {
    console.log(product);
  }

  ngOnDestroy(): void {
    this.productSubscription$.unsubscribe();
  }
}

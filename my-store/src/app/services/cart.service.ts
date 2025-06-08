import { Injectable } from '@angular/core';
import { ProductService } from './product.service';
import { Product } from '../models/interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: Product[] = [];
  products$!: Observable<Product[]>;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.cartItems = this.getCartItems();
    this.products$ = this.productService.getProducts();
  }
  addToCart(product: Product): void {
    console.log('cartServiceAdding to cart:', product);
    const existingProduct = this.cartItems.find(
      (item) => item.id === product.id,
    );
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      product.quantity = 1;
      this.cartItems.push(product);
    }
  }

  removeFromCart(productId: number): void {
    this.cartItems = this.cartItems.filter((item) => item.id !== productId);
  }

  getCartItems(): Product[] {
    return this.cartItems;
  }

  clearCart(): void {
    this.cartItems = [];
  }

  getTotalItems(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  getTotalPrice(): number {
    return this.cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  }

  checkout(name: string, address: string, paymentDetails: string): void {
    console.log('Checkout Details:', {
      name,
      address,
      paymentDetails,
      cartItems: this.cartItems,
    });
    this.clearCart();
  }
}

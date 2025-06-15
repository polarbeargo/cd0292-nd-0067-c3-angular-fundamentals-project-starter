import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: Product[] = [];
  private cartItemsSubject = new BehaviorSubject<Product[]>(this.cartItems);

  cartItems$ = this.cartItemsSubject.asObservable();

  addToCart(product: Product): void {
    console.log('Service Adding to cart:', product);
    const existingProduct = this.cartItems.find(
      (item) => item.id === product.id,
    );

    const addQty = Number(product.quantity);

    if (existingProduct) {
      existingProduct.quantity = Number(existingProduct.quantity) + addQty;
      console.log('existingProduct', existingProduct.quantity);
    } else {
      this.cartItems.push({ ...product, quantity: addQty });
    }
    console.log('Service Current cart items:', this.cartItems);
    this.cartItemsSubject.next(this.cartItems);
  }

  removeFromCart(productId: number): void {
    this.cartItems = this.cartItems.filter((item) => item.id !== productId);
    this.cartItemsSubject.next(this.cartItems);
  }

  getCartItems(): Product[] {
    return this.cartItems;
  }

  clearCart(): void {
    this.cartItems = [];
    this.cartItemsSubject.next(this.cartItems);
  }

  getTotalItems(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  getTotalPrice(): number {
    return this.cartItems.reduce(
      (total, item) => total + item.price * (item.quantity),
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

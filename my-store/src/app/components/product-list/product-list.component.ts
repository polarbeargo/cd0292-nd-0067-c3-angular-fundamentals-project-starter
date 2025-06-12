import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/interface';
import { Observable } from 'rxjs';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products$!: Observable<Product[]>;
  showSuccessMessage: boolean = false;
  constructor(
    private productService: ProductService,
    private cartService: CartService,
  ) {}

  ngOnInit(): void {
    this.products$ = this.productService.getProducts();
  }

  addToCart(product: Product): void {
    console.log('list Adding to cart:', product);
    this.cartService.addToCart(product);
    this.showSuccessMessage = true;
    setTimeout(() => {
      this.showSuccessMessage = false;
    }, 2000);
  }
}

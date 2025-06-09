import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../models/interface';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
})
export class ProductItemComponent {
  @Input() product!: Product;
  @Output() addToCart = new EventEmitter<Product>();

  onAddToCart() {
    console.log('Item Adding to cart:', this.product);
    this.addToCart.emit(this.product);
  }
}

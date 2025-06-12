import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  product$!: Observable<Product | undefined>;
  showSuccessMessage: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
  ) {}

  ngOnInit(): void {
    const productId = +this.route.snapshot.paramMap.get('id')!;
    this.product$ = this.productService
      .getProducts()
      .pipe(map((products) => products.find((p) => p.id === productId)));
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
    this.showSuccessMessage = true;
    setTimeout(() => {
      this.showSuccessMessage = false;
    }, 2000);
  }

  goBack(): void {
    window.history.back();
  }
}

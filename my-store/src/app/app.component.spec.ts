import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routes';
import { ProductService } from './services/product.service';
import { CartService } from './services/cart.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Product } from './models/interface';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { ProductDetailsComponent } from './components/product-item-detail/product-item-detail.component';

describe('AppComponent and related components', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, AppRoutingModule],
      providers: [
        {
          provide: ProductService,
          useValue: {
            getProducts: () =>
              of([
                {
                  id: 1,
                  name: 'Test',
                  price: 10,
                  description: '',
                  url: '',
                } as Product,
              ]),
          },
        },
        {
          provide: CartService,
          useValue: { addToCart: jasmine.createSpy('addToCart') },
        },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => '1' } } },
        },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'my-store' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('my-store');
  });

  it('should create ProductListComponent', () => {
    const fixture = TestBed.createComponent(ProductListComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should load products on init in ProductListComponent', (done) => {
    const fixture = TestBed.createComponent(ProductListComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    component.products$.subscribe((products) => {
      expect(products.length).toBeGreaterThan(0);
      done();
    });
  });

  it('should call CartService.addToCart when addToCart is called in ProductListComponent', () => {
    const fixture = TestBed.createComponent(ProductListComponent);
    const component = fixture.componentInstance;
    const cartService = TestBed.inject(CartService);
    const product = {
      id: 1,
      name: 'Test',
      price: 10,
      description: '',
      url: '',
    } as Product;
    component.addToCart(product);
    expect(cartService.addToCart).toHaveBeenCalledWith(product);
  });

  it('should create ProductItemComponent', () => {
    const fixture = TestBed.createComponent(ProductItemComponent);
    const component = fixture.componentInstance;
    component.product = {
      id: 1,
      name: 'Test',
      price: 10,
      description: '',
      url: '',
    } as Product;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should emit addToCart event when onAddToCart is called in ProductItemComponent', () => {
    const fixture = TestBed.createComponent(ProductItemComponent);
    const component = fixture.componentInstance;
    component.product = {
      id: 1,
      name: 'Test',
      price: 10,
      description: '',
      url: '',
    } as Product;
    spyOn(component.addToCart, 'emit');
    component.onAddToCart();
    expect(component.addToCart.emit).toHaveBeenCalledWith(component.product);
  });

  it('should create ProductDetailsComponent', () => {
    const fixture = TestBed.createComponent(ProductDetailsComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should load product on init in ProductDetailsComponent', (done) => {
    const fixture = TestBed.createComponent(ProductDetailsComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    component.product$.subscribe((product) => {
      expect(product?.id).toBe(1);
      done();
    });
  });

  it('should call CartService.addToCart when addToCart is called in ProductDetailsComponent', () => {
    const fixture = TestBed.createComponent(ProductDetailsComponent);
    const component = fixture.componentInstance;
    const cartService = TestBed.inject(CartService);
    const product = {
      id: 1,
      name: 'Test',
      price: 10,
      description: '',
      url: '',
    } as Product;
    component.addToCart(product);
    expect(cartService.addToCart).toHaveBeenCalledWith(product);
  });
});

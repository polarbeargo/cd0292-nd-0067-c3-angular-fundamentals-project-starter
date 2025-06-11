import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css'],
})
export class ConfirmationComponent {
  name: string = '';
  address: string = '';
  paymentDetails: string = '';
  isSuccess: boolean = false;

  constructor(private cartService: CartService) {}

  onSubmit(): void {
    this.cartService.checkout(this.name, this.address, this.paymentDetails);
    console.log('Confirmation Details:', {
      name: this.name,
      address: this.address,
      paymentDetails: this.paymentDetails,
    });
    this.isSuccess = true;
  }
}

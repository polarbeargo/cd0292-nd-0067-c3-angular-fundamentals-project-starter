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
  nameError: string = '';
  addressError: string = '';
  paymentError: string = '';

  constructor(private cartService: CartService) {}

  onSubmit(): void {
    this.validateForm();
    if (!this.nameError && !this.addressError && !this.paymentError) {
      this.cartService.checkout(this.name, this.address, this.paymentDetails);
      console.log('Confirmation Details:', {
        name: this.name,
        address: this.address,
        paymentDetails: this.paymentDetails,
      });
      this.isSuccess = true;
    }
  }

  validateForm(): void {
    this.nameError =
      this.name.length < 3 ? 'Name must be at least 3 characters long.' : '';
    this.addressError =
      this.address.length < 5
        ? 'Address must be at least 5 characters long.'
        : '';
    this.paymentError = !this.paymentDetails
      ? 'Payment details is required.'
      : isNaN(Number(this.paymentDetails))
        ? 'Payment details must be a number.'
        : '';
  }
}

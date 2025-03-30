import { Component } from '@angular/core';
import { CartService } from '../../service/cart/cart.service';
import { Product } from '../../types/products';
import { Router } from '@angular/router';

@Component({
    selector: 'app-cart',
    standalone: true,
    imports: [],
    templateUrl: './cart.component.html',
    styleUrl: './cart.component.css'
})
export class CartComponent {

  constructor(private CartService: CartService, private router: Router) { }

  getProducts() {
    return this.CartService.getProducts()
  }

  removeProduct(product: Product) {
    this.CartService.removeProduct(product);
  }

  closeCart() {
    this.CartService.hideCart()
  }

  getTotal() {
    return this.CartService.getTotal()
  }
  goToCheckout() {
    this.router.navigate(['/product-form']);
  }
}

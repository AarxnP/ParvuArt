import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../service/cart/cart.service';
import { AuthService } from '../../service/auth/auth.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {

  constructor(private CartService: CartService, private AuthService: AuthService) { }

  openCart() {
    this.CartService.showCart()
  }
  loginWithGoogle() {
    this.AuthService.loginWithGoogle();
  }
  getCurrentUser() {
    return this.AuthService.getCurrentUser();
  }
  logout() {
    this.AuthService.logout()
    .then(() => console.log('logout exitoso'))
    .catch((error) => console.log(error));
  }
 
}
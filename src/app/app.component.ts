import { Component } from '@angular/core';
import { CartService } from './service/cart/cart.service';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { CartComponent } from './components/cart/cart.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, NavBarComponent, FooterComponent, CartComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pag-parvu';


  constructor(private CartService: CartService) { }

  isCartVisible() {
    return this.CartService.isCartVisible();
  }
}

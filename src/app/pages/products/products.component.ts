import { Component } from '@angular/core';
import { Product } from '../../types/products';
import { Router } from '@angular/router';
import { ProductsService } from '../../service/products/products.service';
import { CartService } from '../../service/cart/cart.service';
@Component({
    selector: 'app-products',
    standalone: true,
    imports: [],
    templateUrl: './products.component.html',
    styleUrl: './products.component.css'
})
export class ProductsComponent {
  products : Product[] = [
    // {
    //   "id": 1,
    //   "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    //   "price": 109.95,
    //   "desciption": "oli",
    //   "category": "men's clothing",
    //   "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    //   "rating": {
    //     "rate": 3.9,
    //     "count": 120
    //   }
    // },
    // {
    //   "id": 2,
    //   "title": "Mens Casual Premium Slim Fit T-Shirts ",
    //   "price": 22.3,
    //   "desciption": "oli",
    //   "category": "men's clothing",
    //   "image": "https://fakestoreapi.com/img/71-3HjOadlL._AC_SY879._SX._UX._SY._UY_.jpg",
    //   "rating": {
    //     "rate": 4.1,
    //     "count": 259
    //   }
    // }
  ];


  constructor(private router: Router, 
              private ProductsService: ProductsService, 
              private CartService: CartService) { } 

  ngOnInit() {
    //this.ProductsService.loadProductstoFirebase();
    this.getProducts();
    
  }
  
  goToProduct(id: number) {
    this.router.navigate(['/products', id]);
  }

  getProducts() {
    this.ProductsService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  addToCart(event: Event, product: Product) {
    event.stopPropagation();
    this.CartService.addProduct(product);
  }
}

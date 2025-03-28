import { Component } from '@angular/core';
import { Product } from '../../types/products';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductsService } from '../../service/products/products.service';

@Component({
    selector: 'app-product',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './product.component.html',
    styleUrl: './product.component.css'
})
export class ProductComponent {
  product: Product | undefined;

  constructor(private activedRoute: ActivatedRoute, private ProductsService: ProductsService) {}

  ngOnInit() {
    this.activedRoute.params.subscribe(params => {
      const id = params['id'];
      this.ProductsService.getProduct(id).subscribe(product => {
        this.product = product;
      })
    })
  }
}

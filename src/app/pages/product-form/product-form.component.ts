import { Component } from '@angular/core';
import { ProductsService } from '../../service/products/products.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent {
  form: FormGroup;
  id: number = 0;
  cuentaDestino: string = '';
  numeroCuenta: string = '';

  constructor(
    private ProductsService: ProductsService, 
    private FormBuilder: FormBuilder,
    private Router: Router,
    private ActivatedRoute: ActivatedRoute
  ) {
    this.form = this.FormBuilder.group({
      title: ["", [Validators.required]],
      description: [""],
      price: [0, [Validators.required]],
      category: [""],
      image: [""],
      rating: [{rate: 0, count: 0}]
    })
  }

  ngOnInit(){
    this.ActivatedRoute.params.subscribe(params => {
      this.id = params['id'];
      if(!this.id) return;
      this.ProductsService.getProduct(this.id).subscribe(product => {
        this.form.patchValue(product);
      });
    })
  }  

  addProduct(){
    if(this.form.invalid) return;
    this.ProductsService.addProduct(this.form.value)
      .then(() => this.Router.navigate(["/products"]))
      .catch(err => console.log(err));
  }

  updateProduct(){
    if(this.form.invalid) return;
    this.ProductsService.updateProduct({ id: this.id, ...this.form.value})
      .then(() => this.Router.navigate(["/products"]))
      .catch(err => console.log(err));
  }
  
}


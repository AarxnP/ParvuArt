import { Component } from '@angular/core';
import { Product } from '../../types/products';
import { Router, RouterLink } from '@angular/router';
import { ProductsService } from '../../service/products/products.service';
import { CartService } from '../../service/cart/cart.service';
import { UsersService } from '../../service/users/users.service';
@Component({
    selector: 'app-products',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './products.component.html',
    styleUrl: './products.component.css'
})
export class ProductsComponent {
  products: Product[] = [
    // // Producto 1: PDF Educativo para Bebés
    // {
    //   "id": 1,
    //   "title": "Guía de Estimulación Temprana para Bebés (8 meses - 2 años)",
    //   "price": 19.95,
    //   "desciption": "Un PDF interactivo con actividades y ejercicios para estimular el desarrollo cognitivo, motor y sensorial de los bebés de 8 meses a 2 años.",
    //   "category": "PDFs educativos",
    //   "image": "https://example.com/pdf-image.jpg",  // Imagen representativa del PDF
    //   "rating": {
    //     "rate": 4.8,
    //     "count": 150
    //   }
    // },
    // // Producto 2: Curso Online para Padres
    // {
    //   "id": 2,
    //   "title": "Curso de Estimulación Temprana para Padres (2 - 5 años)",
    //   "price": 49.95,
    //   "desciption": "Curso completo online que enseña técnicas de estimulación cognitiva, emocional y física para niños de 2 a 5 años.",
    //   "category": "Cursos online",
    //   "image": "https://example.com/course-image.jpg",  // Imagen representativa del curso
    //   "rating": {
    //     "rate": 4.9,
    //     "count": 200
    //   }
    // },
    // // Producto 3: PDF Educativo sobre Lenguaje
    // {
    //   "id": 3,
    //   "title": "Desarrollo del Lenguaje en Niños (0 - 3 años)",
    //   "price": 15.99,
    //   "desciption": "PDF con actividades y ejercicios para estimular el lenguaje en los primeros años de vida de los niños.",
    //   "category": "PDFs educativos",
    //   "image": "https://example.com/pdf-language.jpg",  // Imagen representativa del PDF
    //   "rating": {
    //     "rate": 4.7,
    //     "count": 130
    //   }
    // },
    // // Producto 4: Video Curso de Motricidad
    // {
    //   "id": 4,
    //   "title": "Curso de Motricidad Temprana (0 - 5 años)",
    //   "price": 39.99,
    //   "desciption": "Curso online de motricidad temprana, que enseña ejercicios prácticos para ayudar al desarrollo motor de los niños.",
    //   "category": "Cursos online",
    //   "image": "https://example.com/course-motor.jpg",  // Imagen representativa del curso
    //   "rating": {
    //     "rate": 4.6,
    //     "count": 175
    //   }
    // },
    // // Producto 5: PDF sobre Desarrollo Emocional
    // {
    //   "id": 5,
    //   "title": "Desarrollo Emocional en Niños (1 - 3 años)",
    //   "price": 17.50,
    //   "desciption": "PDF con estrategias y actividades para fomentar la inteligencia emocional y la regulación emocional en niños pequeños.",
    //   "category": "PDFs educativos",
    //   "image": "https://example.com/pdf-emotion.jpg",  // Imagen representativa del PDF
    //   "rating": {
    //     "rate": 4.5,
    //     "count": 95
    //   }
    // },
    // // Producto 6: Video Curso de Actividades Sensoriales
    // {
    //   "id": 6,
    //   "title": "Curso de Estimulación Sensorial para Niños (0 - 5 años)",
    //   "price": 44.99,
    //   "desciption": "Curso online con actividades sensoriales que promueven el desarrollo de los sentidos en los primeros años de vida.",
    //   "category": "Cursos online",
    //   "image": "https://example.com/course-sensory.jpg",  // Imagen representativa del curso
    //   "rating": {
    //     "rate": 4.8,
    //     "count": 160
    //   }
    // },{
    //   "id": 7,
    //   "title": "Guía Interactiva de Estimulación Visual para Bebés (0 - 2 años)",
    //   "price": 22.99,
    //   "desciption": "Una guía interactiva en formato PDF para padres, con actividades visuales para estimular la visión de los bebés y mejorar la percepción de colores y formas.",
    //   "category": "PDFs educativos",
    //   "image": "https://example.com/visual-guide.jpg",  // Imagen representativa del PDF
    //   "rating": {
    //     "rate": 4.7,
    //     "count": 140
    //   }
    // },
    // // Producto 8: Video Curso de Estimulación Cognitiva para Niños Pequeños
    // {
    //   "id": 8,
    //   "title": "Curso de Estimulación Cognitiva para Niños (2 - 5 años)",
    //   "price": 49.50,
    //   "desciption": "Un curso online diseñado para mejorar las habilidades cognitivas de los niños a través de juegos educativos, retos mentales y actividades interactivas.",
    //   "category": "Cursos online",
    //   "image": "https://example.com/cognitive-course.jpg",  // Imagen representativa del curso
    //   "rating": {
    //     "rate": 4.9,
    //     "count": 180
    //   }
    // }
  ];
  
  role: string = 'user';


  constructor(
    private router: Router, 
    private productsService: ProductsService,
    private cartService: CartService,
    private usersService: UsersService
  ) {}

  ngOnInit(){
    this.getProducts();
    this.productsService.loadProductstoFirebase();
    this.getRole();
  }

  goToProduct(id: number) {
    this.router.navigate(['/products', id]);
  }

  getProducts() {
    this.productsService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  addToCart(event: Event, product: Product) {
    event.stopPropagation();
    this.cartService.addProduct(product);
  }

  deleteProduct(event: Event, id: number) {
    event.stopPropagation();
    this.productsService.deleteProduct(id)
      .then(() => console.log("Producto eliminado con exito"))
      .catch(err => console.log(err));
  }

  getRole() {
    this.usersService.getCurrentUser()!
      .then(user => {
        console.log(user);
        this.role = user?.["role"]
      });
  }
}
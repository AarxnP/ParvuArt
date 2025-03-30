import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ProductComponent } from './pages/product/product.component';
import { LoginComponent } from './pages/login/login.component';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { SobreMiComponent } from './pages/sobre-mi/sobre-mi.component';
import { permissionsGuard } from './guards/permissions/permissions.guard';
import { ProductFormComponent } from './pages/product-form/product-form.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    // { path: 'sobreMi', component: SobreMiComponent },

    { path: 'products', 
        component: ProductsComponent, 
        ...canActivate(() => redirectUnauthorizedTo(["/login"])) },

    { path: 'products/:id', 
        component: ProductComponent, 
        canActivate: [permissionsGuard]
    },

    { path: 'product-form', component: ProductFormComponent },
    { path: 'login', component: LoginComponent},
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', component: NotFoundComponent }
];

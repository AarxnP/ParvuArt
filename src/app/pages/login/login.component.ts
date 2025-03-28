import { Component } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgIcon, NgIconComponent, provideIcons } from '@ng-icons/core';
import {bootstrapGoogle} from '@ng-icons/bootstrap-icons'
import { AuthService } from '../../service/auth/auth.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,NgIconComponent],
  providers: [provideIcons({bootstrapGoogle})],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
 loginForm: FormGroup;
 showRegister: boolean = false;
 errorMessage: string = '';
 constructor(private formBuilder: FormBuilder, private AuthService: AuthService) {
  this.loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]], 
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ["", [this.confirmPasswordValidator()]]
  });
}
login(){
  if(this.email?.invalid || this.password?.invalid) return;
  if(this.showRegister){
    if(this.confirmPassword?.invalid) return;
    this.AuthService.registerWithEmail(this.email?.value, this.password?.value)
      .then(() => {
        this.errorMessage = "";
      })
      .catch(err => {
        console.log(err);
        this.errorMessage = err.message;
      });
    return;
  }
  this.AuthService.loginWithEmail(this.email?.value, this.password?.value)
    .then(() => {
      this.errorMessage = "";
    })
    .catch(err => {
      console.log(err);
      this.errorMessage = err.message;
    });
}
registerWithGoogle(){
  this.AuthService.loginWithGoogle()
  .then(()=>this.errorMessage = '')
  .catch((error)=> {
    console.log(error);
    this.errorMessage = error.message;  
    });
}

toggleRegister(){
  this.showRegister = !this.showRegister
}
get email(){
  return this.loginForm.get('email');
}
get password(){
  return this.loginForm.get('password')};

get confirmPassword(){
  return this.loginForm.get('confirmPassword');
}

   confirmPasswordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!this.showRegister) return null;
      const error = this.password?.value !== control.value;
      return error ? {confirmPassword: {value: control.value}} : null;
    };
  }
}


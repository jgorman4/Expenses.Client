import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  imports: [CommonModule,ReactiveFormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(private fb:FormBuilder, private authService:AuthService, private router: Router) {
    this.loginForm = this.fb.group(
    {
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    }
    )
  }

  hasError(controlName: string, errorName:string) : boolean {
    const control = this.loginForm.get(controlName);
    return (control?.touched || control?.dirty) && control.hasError(errorName) || false;
  }

  onSubmit():void{
    if(this.loginForm.valid){
      const login = this.loginForm.value;
      this.authService.login(login).subscribe({
        next: () => {
          this.router.navigate(['transactions'])
        },

        error: (error) => {
          console.log("Error - ", error)
          this.errorMessage = error.error?.message || "An error occured during login. Please try again"
        }
      })

    }
  }
}

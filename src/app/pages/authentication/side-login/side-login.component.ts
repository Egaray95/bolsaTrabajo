import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../../material.module';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from 'src/app/services/auth-service.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-side-login',
  standalone: true,
  imports: [
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  templateUrl: './side-login.component.html',
})
export class AppSideLoginComponent {
  loginForm: FormGroup;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      usuario: [''],
      password: [''],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  submit() {
    // console.log(this.form.value);
    this.router.navigate(['/']);
  }

  onLogin() {
    const { usuario, password } = this.loginForm.value;
    this.authService.login(usuario, password).subscribe((resp) => {
      if (resp) {
        // this.router.navigate(['/']);

        const storedUser = localStorage.getItem('usuario');
        if (storedUser) {
          const user = JSON.parse(storedUser); // Convertir a objeto
          const userType = user.Tipo; // Leer el tipo del usuario

          // Redirigir basado en el tipo
          if (userType === 'profesion') {
            this.router.navigate(['/inicio/datos']);
          } else if (userType === 'reclutador') {
            this.router.navigate(['/inicio/filtros']);
          } else {
            // En caso de que el tipo no sea reconocido, redirigir al login
            this.router.navigate(['/authentication/login']);
          }
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error al iniciar sesion',
          text: 'Usuario o contraseña incorrecta',
          confirmButtonText: 'Aceptar',
        });
      }
    });
  }
}

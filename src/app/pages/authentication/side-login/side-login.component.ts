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
      usuario: ['',Validators.required],
      password: ['',Validators.required],
    });
  }


  onLogin() {
    if (this.loginForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Formulario incompleto',
        text: 'Por favor, ingresar los datos de usuario.',
        confirmButtonText: 'Aceptar',
      });
      return;
    }

    const { usuario, password } = this.loginForm.value;
    this.authService.login(usuario, password).subscribe((resp) => {
      if (resp) {
        const storedUser = localStorage.getItem('usuario');
        if (storedUser) {
          const user = JSON.parse(storedUser); 
          const userType = user.Tipo; 

       
          if (userType === 'profesion') {
            this.router.navigate(['/inicio/datos']);
          } else if (userType === 'reclutador') {
            this.router.navigate(['/inicio/filtros']);
          } else {           
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

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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { AuthService } from 'src/app/services/auth-service.service';

import Swal from 'sweetalert2';
import { MatOptionModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';

interface profesion {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-side-register',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatRadioModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatOptionModule, // Importa este módulo aquí
    MatCheckboxModule,
    NgxMatFileInputModule,
  ],
  templateUrl: './side-register.component.html',
})
export class AppSideRegisterComponent {
  registroForm: FormGroup;
  fileControl: FormControl;
  profesionList: profesion[] = [
    { value: '1', viewValue: 'Ingeniero Civil' },
    { value: '2', viewValue: 'Administrador' },
    { value: '3', viewValue: 'Médico General' },
    { value: '4', viewValue: 'Ingeniero de Sistemas' },
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private usuarioService: AuthService
  ) {
    this.fileControl = new FormControl(null, Validators.required); 
    this.registroForm = this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      celular: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
      profesion: ['1', Validators.required],
      cv: this.fileControl,
      usuario: ['', Validators.required],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  guardarFormulario() {
    if (this.registroForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Formulario incompleto',
        text: 'Por favor, completa todos los campos correctamente.',
        confirmButtonText: 'Aceptar',
      });
      return;
    }

    // Datos del formulario
    const datos = this.registroForm.value;

    const usuario_ = {
      nombres: datos.nombres,
      apellidos: datos.apellidos,
      correo: datos.correo,
      celular: datos.celular,
      profesion: datos.profesion,
      usuario: datos.usuario,
      password: datos.contrasena,
      tipo: 'profesion'

    };

    // Usar el servicio para registrar los datos
    this.usuarioService.registrarUsuarioProfesion(usuario_);

    // Alerta de éxito
    Swal.fire({
      icon: 'success',
      title: 'Registro exitoso',
      text: 'El usuario ha sido registrado correctamente.',
      confirmButtonText: 'Aceptar',
    }).then(() => {
      this.registroForm.reset(); // Limpiar formulario
    });
  }

  onFileSelected(event: any) {
    console.log("data",event.target)
   // this.registroForm.controls['cv'].setValue(event.target.files[0]);
  }



  volverLogin() {
    this.router.navigate(['authentication/login']);
  }
}

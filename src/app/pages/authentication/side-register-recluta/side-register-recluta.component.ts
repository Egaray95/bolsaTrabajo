import { Component, OnInit } from '@angular/core';
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
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth-service.service';
import { CommonModule } from '@angular/common';
interface profesion {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-side-register-recluta',
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
    MatCheckboxModule,
    NgxMatFileInputModule,
  ],
  templateUrl: './side-register-recluta.component.html',
})
export class SideRegisterReclutaComponent implements OnInit {
  registroForm: FormGroup;

  profesionList: profesion[] = [
    { value: '1', viewValue: 'Ingeniero Civil' },
    { value: '2', viewValue: 'Administrador' },
    { value: '3', viewValue: 'Médico General' },
    { value: '4', viewValue: 'Ingeniero de Sistemas' },
  ];


  constructor(private fb: FormBuilder, private usuarioService: AuthService,private router: Router) {
    this.registroForm = this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      usuario: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  ngOnInit(): void {
    //throw new Error('Method not implemented.');
  }

  onRegistrar() {
    if (this.registroForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Formulario incompleto',
        text: 'Por favor, completa todos los campos correctamente.',
        confirmButtonText: 'Aceptar'
      });
      return;
    }

    // Datos del formulario
    const datos = this.registroForm.value;

    const usuario_ = {
      nombres: datos.nombres,
      apellidos: datos.apellidos,
      usuario: datos.usuario,
      password: datos.password,
      tipo: 'reclutador'
    };

    // Usar el servicio para registrar los datos
    this.usuarioService.registrarUsuario(usuario_);

    // Alerta de éxito
    Swal.fire({
      icon: 'success',
      title: 'Registro exitoso',
      text: 'El usuario ha sido registrado correctamente.',
      confirmButtonText: 'Aceptar'
    }).then(() => {
      this.registroForm.reset(); // Limpiar formulario
    });
  }
 



  volverLogin(){
    this.router.navigate(['authentication/login']);
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { CommonModule } from '@angular/common';


interface profesion {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-forms',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatCheckboxModule,
  ],
  templateUrl: './forms.component.html',
})
export class AppFormsComponent implements OnInit {
  
  profesionList: profesion[] = [
    { value: '1', viewValue: 'Ingeniería Eléctrica' },
    { value: '2', viewValue: 'Ingeniería Mecánica' },
    { value: '3', viewValue: 'Ingeniería en Sistemas Industriales' },
    { value: '4', viewValue: 'Ingeniería Civil' },
    { value: '5', viewValue: 'Ingeniería en sistemas' },
    { value: '6', viewValue: 'Arquitectura' },
  ];



  userForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      id: [''],
      Celular: [''],
      Tipo: [''],
      Correo: [''],
      contrasena: [''],
      usuario: [''],
      Profesion: [''],
      Nombres: [''],
      Apellidos: [''],
    });
  }
  
  ngOnInit(): void {
    const storedUser = localStorage.getItem('usuario');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      this.userForm.patchValue(userData);
    }
    this.userForm.disable();
  }

}

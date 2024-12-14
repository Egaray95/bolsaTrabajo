import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MaterialModule } from 'src/app/material.module';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from 'src/app/services/auth-service.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

// table 1
interface profesion {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-tables',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatTableModule,
    CommonModule,
    MatCardModule,
    MaterialModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
  ],
  templateUrl: './tables.component.html',
})
export class AppTablesComponent implements OnInit {

  profesionList: profesion[] = [
    { value: '1', viewValue: 'Ingeniería Eléctrica' },
    { value: '2', viewValue: 'Ingeniería Mecánica' },
    { value: '3', viewValue: 'Ingeniería en Sistemas Industriales' },
    { value: '4', viewValue: 'Ingeniería Civil' },
    { value: '5', viewValue: 'Ingeniería en sistemas' },
    { value: '6', viewValue: 'Arquitectura' },
  ];

  dataSource : any[] = [];
  displayedColumns: string[] = ['index', 'Nombres', 'Apellidos', 'Celular', 'Correo', 'Profesion', 'Acciones'];

  apellidoFilter = new FormControl('');
  profesionFilter = new FormControl('');


  constructor(private authService : AuthService){

  }

  ngOnInit(): void {
    this.listarProfesionales();
  }


  listarProfesionales(){
    this.authService.getUsersProfesionales().subscribe(resp=>{
      if(resp){
        console.log("datos",resp);
        this.dataSource = resp;
      }
    })
  }


  getProfesionViewValue(profesionId: string): string {
    const profesion = this.profesionList.find(p => p.value === profesionId);
    return profesion ? profesion.viewValue : 'Unknown';
  }

  applyFilters() {
    const apellido = this.apellidoFilter.value?.toLowerCase();
    const profesion = this.profesionFilter.value;
    
    this.dataSource = this.dataSource.filter(element => {
      return (!apellido || element.Apellidos.toLowerCase().includes(apellido)) &&
             (!profesion || element.Profesion === profesion);
    });
  }

  clearFilters() {
    this.apellidoFilter.setValue('');
    this.profesionFilter.setValue('');
    this.listarProfesionales();
  }
}

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
export interface productsData {
  id: number;
  imagePath: string;
  uname: string;
  budget: number;
  priority: string;
}

const PRODUCT_DATA: productsData[] = [
  {
    id: 1,
    imagePath: 'assets/images/profile/user-1.jpg',
    uname: 'iPhone 13 pro max-Pacific Blue-128GB storage',
    budget: 180,
    priority: 'confirmed',
  },
  {
    id: 2,
    imagePath: 'assets/images/profile/user-2.jpg',
    uname: 'Apple MacBook Pro 13 inch-M1-8/256GB-space',
    budget: 90,
    priority: 'cancelled',
  },
  {
    id: 3,
    imagePath: 'assets/images/profile/user-3.jpg',
    uname: 'PlayStation 5 DualSense Wireless Controller',
    budget: 120,
    priority: 'rejected',
  },
  {
    id: 4,
    imagePath: 'assets/images/profile/user-4.jpg',
    uname: 'Amazon Basics Mesh, Mid-Back, Swivel Office',
    budget: 160,
    priority: 'confirmed',
  },
];

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

  profesionList = [
    { value: '1', viewValue: 'Ingeniero Civil' },
    { value: '2', viewValue: 'Administrador' },
    { value: '3', viewValue: 'Médico General' },
    { value: '4', viewValue: 'Ingeniero de Sistemas' },
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

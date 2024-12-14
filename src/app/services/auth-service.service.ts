import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import {
  addDoc,
  collection,
  collectionData,
  Firestore,
  getDocs,
  Query,
  query,
  where,
} from '@angular/fire/firestore';

interface User {
  id: string;
  email: string;
  password: string;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private firestore: Firestore
  ) {}

  getUsers(): Observable<any[]> {
    const collectionRef = collection(this.firestore, 'Usuarios');
    
    return new Observable(observer => {
      getDocs(collectionRef).then(snapshot => {
        const documents = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        observer.next(documents);
        observer.complete();
      }).catch(error => {
        observer.error(error);
      });
    });
  }

  getUsersProfesionales(): Observable<any[]> {
    const collectionRef = collection(this.firestore, 'Usuarios');
    const queryRef = query(collectionRef, where('Tipo', '==', 'profesion'));
    
    return new Observable(observer => {
      getDocs(queryRef).then(snapshot => {
        const documents = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        observer.next(documents);
        observer.complete();
      }).catch(error => {
        observer.error(error);
      });
    });
  }





  login(usuario: string, password: string): Observable<boolean> {
    return this.getUsers().pipe(
      map((users) => {
        const foundUser = users.find(
          (user) => user.usuario === usuario && user.contrasena === password
        );
  
        if (foundUser) {
          // Guardar el usuario autenticado en localStorage
          localStorage.setItem('usuario', JSON.stringify(foundUser));
          return true;
        } else {
          return false;
        }
      })
    );
  }

  getUsuarioSesion() {
    const usuario = sessionStorage.getItem('usuario');
    return usuario ? JSON.parse(usuario) : null;
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/authentication/login']);
  }

  async registrarUsuario(usuario: any) {
    const obj = Object.assign({
      Nombres: usuario.nombres,
      Apellidos: usuario.apellidos,
      Tipo : usuario.tipo,
      usuario: usuario.usuario,
      contrasena: usuario.password,
    });

    const ref = collection(this.firestore, 'Usuarios');

    await addDoc(ref, obj);
  }

  async registrarUsuarioProfesion(usuario: any) {
    const obj = Object.assign({
      Nombres: usuario.nombres,
      Apellidos: usuario.apellidos,
      Correo : usuario.correo,
      Celular : usuario.celular,
      Profesion: usuario.profesion,
      Tipo : usuario.tipo,
      usuario: usuario.usuario,
      contrasena: usuario.password,
      UrlCV : Math.random() < 0.5 ? '/assets/cv1.pdf' : '/assets/cv2.pdf'
    });

    const ref = collection(this.firestore, 'Usuarios');

    await addDoc(ref, obj);
  }
}

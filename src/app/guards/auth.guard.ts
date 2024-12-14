import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const storedUser = localStorage.getItem('usuario');

    if (!storedUser) {
      // Si no hay usuario autenticado, redirigir al login
      this.router.navigate(['/authentication/login']);
      return false;
    }

    const user = JSON.parse(storedUser);
    const userType = user.Tipo;

    // Verificar el tipo de usuario contra la ruta
    const allowedRoles = route.data['roles'] as Array<string>;

    if (allowedRoles.includes(userType)) {
      return true; // Permitir el acceso
    } else {
      // Redirigir al usuario a su ruta principal si intenta acceder a una no permitida
      if (userType === 'profesion') {
        this.router.navigate(['/inicio/datos']);
      } else if (userType === 'reclutador') {
        this.router.navigate(['/inicio/filtros']);
      }
      return false;
    }
  }
}

import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Inicio',
  },
  {
    displayName: 'Inicio',
    iconName: 'clipboard-text',
    route: '',
  },

];


export function updateNavItems() {
  const storedUser = localStorage.getItem('usuario');
  if (storedUser) {
    const user = JSON.parse(storedUser);
    const userType = user.Tipo;

    // Configurar la ruta basada en el tipo del usuario
    if (userType === 'profesion') {
      navItems[1].route = '/inicio/datos';
    } else if (userType === 'reclutador') {
      navItems[1].route = '/inicio/filtros';
    }
  }
}

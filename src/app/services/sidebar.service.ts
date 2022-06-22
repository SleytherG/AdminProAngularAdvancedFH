import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [
    {
      title: 'Dashboard',
      icon: 'mdi mdi-gauge',
      submenu: [
        {
          title: 'Main',
          url: '/dashboard'
        },
        {
          title: 'Progress Bar',
          url: '/progress'
        },
        {
          title: 'Gráficas',
          url: '/grafica1'
        },
        {
          title: 'Promesas',
          url: '/promesas'
        },
        {
          title: 'RxJS',
          url: '/rxjs'
        },
      ]
    }
  ];

  constructor() { }
}

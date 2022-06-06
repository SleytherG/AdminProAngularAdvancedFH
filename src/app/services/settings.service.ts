import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private idTheme = document.querySelector("#theme");
  private links!: NodeListOf<Element> | undefined;


  constructor() {
    const url = localStorage.getItem('theme') || "./assets/css/colors/purple-dark.css";
    this.idTheme && this.idTheme.setAttribute('href', url );
  }

  changeTheme(theme: string) {
    if (this.idTheme) {
      // idTheme.setAttribute('href', './assets/css/colors/' + theme + '.css');
      const url = `./assets/css/colors/${theme}.css`;

      this.idTheme.setAttribute('href', url);
      localStorage.setItem('theme', url);
    }
    this.checkCurrentTheme( this.links);
  }

  checkCurrentTheme( links?: NodeListOf<Element>) {
    this.links = links;
    if ( links ) {
      links.forEach( elem => {
        elem.classList.remove('working');
        const btnTheme = elem.getAttribute('data-theme');
        const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`;
        if (this.idTheme) {
          const currentTheme = this.idTheme.getAttribute('href');
          if ( btnThemeUrl === currentTheme ) {
            elem.classList.add('working');
          }
        }
      })
    }
  }


}

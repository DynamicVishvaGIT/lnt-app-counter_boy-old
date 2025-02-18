import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }
  setLang(lang) {

    localStorage.setItem('lang', lang);
  }

  getLang() {
    return localStorage.getItem('lang');
  }
}

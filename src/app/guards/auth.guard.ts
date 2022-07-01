import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {UsuarioService} from "../services/usuario.service";
import {tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private _usuarioService: UsuarioService,
    private _router: Router
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot){


    return this._usuarioService.validarToken().pipe(
      tap( estaAutenticado => {
        if ( !estaAutenticado ) {
          this._router.navigate(['/auth/login']);
        }
      })
    );
  }

}

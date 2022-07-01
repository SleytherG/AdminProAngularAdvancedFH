import {AfterViewInit, Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import Swal from 'sweetalert2';
import { FormBuilder, Validators } from '@angular/forms';

import { UsuarioService } from '../../services/usuario.service';

declare const google: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {

  @ViewChild('googleBtn') googleBtn!: ElementRef;


  formSubmitted = false;

  loginForm = this._fb.group({
    email: [ localStorage.getItem('email') || '' , [Validators.required, Validators.required]],
    password: ['', [Validators.required]],
    remember: [false]
  });

  constructor(
    private _router: Router,
    private _fb: FormBuilder,
    private _usuarioService: UsuarioService,
    private _ngZone: NgZone
  ) { }

  ngOnInit(): void {




  }

  ngAfterViewInit(): void {
      this.googleInit();
  }

  googleInit() {
    google.accounts.id.initialize({
      client_id: "1089833323681-i2segif0nkcokj75kr87nmkb4621jv5o.apps.googleusercontent.com",
      callback: (response: any) => this.handleCredentialResponse(response)
    });
    google.accounts.id.renderButton(
      // document.getElementById("buttonDiv"),
      this.googleBtn.nativeElement,
      { theme: "outline", size: "large" } // customization attributes
    );
  }

  handleCredentialResponse( response: any ) {
     console.log("Encoded JWT ID token: " + response.credential);
     this._usuarioService.logingGoogle( response.credential )
      .subscribe(
        resp => {
          // console.log( {login: resp});
          this._ngZone.run(() => {
            this._router.navigate(['/dashboard']);
          })

        }
      )
  }

  login() {
    // this.contador = 3;


    this._usuarioService.login( this.loginForm.value )
      .subscribe({
        next: (resp: any) => {

          console.log(resp);
          if ( this.loginForm.get('remember')?.value) {
            localStorage.setItem('email', this.loginForm.get('email')?.value);
          } else {
            localStorage.removeItem('email');
          }
          this._router.navigate(['/dashboard']);
          // Swal.fire({
          //   title: 'Exito',
          //   html: `Se ha iniciado sesión exitosamente, sera redirigido en ${this.contador} segundos`,
          //   icon: 'success'
          // }).then(() => {
          //   const intervalo = setInterval(() => {
          //     this.contador--;
          //   }, 1000);
          //   if ( this.contador === 0) {
          //     clearInterval(intervalo);
          //   }
          // });

          // setTimeout(() => {
          //   this._router.navigate(['/dashboard']);
          // }, 3000);



        },
        error: ( err ) => {
          Swal.fire({
            title: 'Error',
            text: err.error.msg,
            icon: 'error'
          });
        }
      })
    console.log(this.loginForm.value);

  }

  // rememberMe() {
  //   if ( this.loginForm.get('remember')?.value && this.loginForm.get('email')?.value !== '') {
  //     localStorage.setItem('email', this.loginForm.get('email')?.value);
  //   } else {
  //     localStorage.removeItem('email');
  //   }
  // }

}

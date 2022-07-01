import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public formSubmitted: boolean = false;

  public registerForm = this._fb.group(
    {
      nombre: ['Sleyther Giulio', [Validators.required, Validators.minLength(3)]],
      email: ['sleythergcp@gmail.com', [Validators.required, Validators.email]],
      password: ['123456', [Validators.required]],
      password2: ['123456', [Validators.required]],
      terminos: [false, [Validators.required]],
    },
    {
      validators: this.passwordsIguales('password', 'password2'),
    }
  );

  constructor(
    private _fb: FormBuilder,
    private _usuarioService: UsuarioService,
    private _router: Router
  ) {}

  ngOnInit(): void {}

  crearUsuario() {
    this.formSubmitted = true;
    // console.log(this.registerForm.value);
    console.log(this.registerForm);

    if (this.registerForm.invalid || !this.registerForm.get('terminos')?.value) {
      return;
    } else {
      // Realizar posteo
      this._usuarioService.crearUsuario(this.registerForm.value)
        .subscribe({
          next: ( resp: any ) => {
            console.log('Usuario Creado');
            console.log(resp);
            if ( resp.ok) {
              Swal.fire({
                title: 'Exito',
                text: 'Usuario creado exitosamente',
                icon: 'success'
              }).then( ()  => {
                this._router.navigate(['/dashboard'])
              })
            }
          },
          error: (err) => {
            console.warn( err.error.msg );
            Swal.fire({
              title:'Error',
              text: err.error.msg,
              icon: 'error'
            })
          }
        })
    }
  }

  campoNoValido(campo: string): boolean {
    if (this.registerForm.get(campo)?.invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  aceptaTerminos() {
    return !this.registerForm.get('terminos')?.value && this.formSubmitted;
  }

  passwordsInvalid() {
    const pass1 = this.registerForm.get('password')?.value;
    const pass2 = this.registerForm.get('password2')?.value;

    if (pass1 !== pass2 && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  passwordsIguales(pass1Name: string, pass2Name: string) {
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      if (pass1Control?.value === pass2Control?.value) {
        pass2Control?.setErrors(null);
      } else {
        pass2Control?.setErrors({ noEsIgual: true });
      }
    };
  }
}

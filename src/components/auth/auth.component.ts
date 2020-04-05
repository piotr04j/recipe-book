import { Component, OnInit } from '@angular/core'
import { NgForm } from '@angular/forms'
import { AuthResponseData, AuthService } from '../../services/auth.service'
import { Observable } from 'rxjs'
import { Router } from '@angular/router'

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {

  public isLoginMode: boolean = true
  public isLoading: boolean = false
  public error: string = null

  constructor (private authService: AuthService, private router: Router) {}

  onSwitchMode () {
    this.isLoginMode = !this.isLoginMode
  }

  onSubmit (form: NgForm) {
    if (!form.valid) {
      return
    }
    const email: string = form.value.email
    const password: string = form.value.password
    let authObservable: Observable<AuthResponseData>

    this.isLoading = true

    if (this.isLoginMode) {
      authObservable = this.authService.login(email, password)
    } else {
      authObservable = this.authService.singup(email, password)
    }

    authObservable.subscribe((data) => {
      console.log(data)
      this.isLoading = false
      this.router.navigate(['/recipes'])
    }, errorMessage => {
      this.error = errorMessage
      this.isLoading = false
    })

    form.reset()
  }
}

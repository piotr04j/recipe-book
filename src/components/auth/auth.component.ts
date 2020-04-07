import { Component, ComponentFactoryResolver, OnDestroy, ViewChild } from '@angular/core'
import { NgForm } from '@angular/forms'
import { AuthResponseData, AuthService } from '../../services/auth.service'
import { Observable, Subscription } from 'rxjs'
import { Router } from '@angular/router'
import { AlertComponent } from '../alert/alert.component'
import { PlaceholderDirective } from '../../utils/placeholder.directive'

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnDestroy {


  public isLoginMode: boolean = true
  public isLoading: boolean = false
  public error: string = null
  private alertComponentSubscription: Subscription

  @ViewChild(PlaceholderDirective, { static: false}) alertHost: PlaceholderDirective

  constructor (private authService: AuthService, private router: Router, private componentFactoryResolver: ComponentFactoryResolver) {}

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
      this.isLoading = false
      this.router.navigate(['/recipes'])
    }, errorMessage => {
      this.error = errorMessage
      this.isLoading = false
      this.showErrorAlert(errorMessage)
    })

    form.reset()
  }

  private showErrorAlert(message: string) {
    const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent)
    const hostViewContainerRef = this.alertHost.viewContainerRef
    hostViewContainerRef.clear()

    const  alertComponentRef = hostViewContainerRef.createComponent(alertComponentFactory)
    alertComponentRef.instance.message = message
    this.alertComponentSubscription = alertComponentRef.instance.close.subscribe(() => {
      hostViewContainerRef.clear()
      this.alertComponentSubscription.unsubscribe()
    })
  }

  ngOnDestroy(): void {
    this.alertComponentSubscription.unsubscribe()
  }
}

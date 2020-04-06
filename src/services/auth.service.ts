import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { firebaseKey } from '../../env/keys'
import { catchError, tap } from 'rxjs/operators'
import { BehaviorSubject, throwError } from 'rxjs'
import { User } from '../models/user.model'
import { Router } from '@angular/router'

export interface AuthResponseData {
  idToken:	string
  email:	string
  refreshToken:	string
  expiresIn:	string
  localId:	string
  registered?: boolean
}

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor (private httpClient: HttpClient, private router: Router) {}

  user = new BehaviorSubject<User>(null)
  token: string = null
  private tokenExpirationTimer: any

  singup(email: string, password: string) {
    const url: string= `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${firebaseKey}`
     return this.httpClient.post<AuthResponseData>(url, {
      email,
      password,
      returnSecureToken: true
    }).pipe(
       catchError(this.handleError),
       tap( responseData => {
         this.handleAuthentication(
           responseData.email,
           responseData.localId,
           responseData.idToken,
           +responseData.expiresIn
         )
       })
     )
  }

  login(email: string, password: string) {
    const url: string= `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${firebaseKey}`
    return this.httpClient.post<AuthResponseData>(url, {
      email,
      password,
      returnSecureToken: true
    }).pipe(
      catchError(this.handleError),
      tap( responseData => {
        this.handleAuthentication(
          responseData.email,
          responseData.localId,
          responseData.idToken,
          +responseData.expiresIn
        )
      })
    )
  }

  private handleError(errorResponse: HttpErrorResponse) {
    let errMsg: string = 'An unknown error occurred!'

    if(!errorResponse.error || !errorResponse.error.error) {
      return throwError(errMsg)
    }

    switch (errorResponse.error.error.message) {
      case 'EMAIL_EXISTS':
        errMsg = 'This email already exist!'
        return throwError(errMsg)
      case 'EMAIL_NOT_FOUND':
        errMsg = 'The email was not found!'
        return throwError(errMsg)
      case 'INVALID_PASSWORD':
        errMsg = 'Invalid password!'
        return throwError(errMsg)
      default:
    }

    return throwError(errMsg)
  }

  logout() {
    this.user.next(null)
    this.router.navigate(['/auth'])
    localStorage.removeItem('user')
    if(this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer)
    }

    this.tokenExpirationTimer = null
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(()=>{
      this.logout()
    }, expirationDuration)
  }

  autoLogin() {
    const userData: {
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('user'))
    if(!userData) {
      return
    }
    const user = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    )

    if(user.token) {
      this.user.next(user)
      const expirationDuration =  new Date(userData._tokenExpirationDate).getTime() - new Date().getTime()
        this.autoLogout(expirationDuration)
    }
  }

  private handleAuthentication(email: string, userId: string, token: string, expireIn: number) {
    const expirationDate = new Date(new Date().getTime() + expireIn * 1000 )
    const user = new User(
      email,
      userId,
      token,
      expirationDate
    )
    this.user.next(user)
    localStorage.setItem('user', JSON.stringify(user))
    this.autoLogout( expireIn * 1000 )
  }
}



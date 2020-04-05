import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { firebaseKey } from '../../env/keys'
import { catchError, tap } from 'rxjs/operators'
import { BehaviorSubject, throwError } from 'rxjs'
import { User } from '../models/user.model'

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

  constructor (private httpClient: HttpClient) {}

  user = new BehaviorSubject<User>(null)
  token: string = null

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

  private handleAuthentication(email: string, userId: string, token: string, expireIn: number) {
    const expirationDate = new Date(new Date().getTime() + expireIn * 1000 )
    const user = new User(
      email,
      userId,
      token,
      expirationDate
    )
    this.user.next(user)
  }
}



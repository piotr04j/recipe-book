import { Component, OnDestroy, OnInit, Output } from '@angular/core'
import { DataStorageService } from '../../services/data-storage.service'
import { Subscription } from 'rxjs'
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit, OnDestroy {
  private subscription: Subscription
  private userSubscription: Subscription
  public isAuthenticated: boolean = false
  constructor (private dataStorageService: DataStorageService, private authService: AuthService) {}

  ngOnInit (): void {
    this.userSubscription = this.authService.user.subscribe( user => {

      this.isAuthenticated = !!user
    })
  }

  onSaveData () {
    this.dataStorageService.storeRecipes()
  }

  onFetchData () {
    this.subscription = this.dataStorageService.fetchRecipes().subscribe()
  }


  ngOnDestroy (): void {
    this.subscription.unsubscribe()
    this.userSubscription.unsubscribe()
  }

  onLogout () {
    this.authService.logout()
  }
}

import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core'
import { DataStorageService } from '../../services/data-storage.service'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnDestroy {
  private subscription: Subscription
  constructor (private dataStorageService: DataStorageService) {}

  onSaveData () {
    this.dataStorageService.storeRecipes()
  }

  onFetchData () {
    this.subscription = this.dataStorageService.fetchRecipes().subscribe()
  }


  ngOnDestroy (): void {
    this.subscription.unsubscribe()
  }
}

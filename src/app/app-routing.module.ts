import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ShoppingListComponent } from '../components/shopping-list/shopping-list.component'
import { AuthComponent } from '../components/auth/auth.component'

const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  { path: 'shopping-list', component: ShoppingListComponent },
  { path: 'auth', component: AuthComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
}
//TODO resolve problem with bug and check empty ingredients after fetch

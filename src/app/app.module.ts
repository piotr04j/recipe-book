import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { ShoppingListComponent } from '../components/shopping-list/shopping-list.component'
import { ShoppingListEditComponent } from '../components/shopping-list-edit/shopping-list-edit.component'
import { HeaderComponent } from '../components/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ShoppingListService } from '../services/shopping-list.service';
import { RecipeService } from '../services/recipe.service'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { AuthComponent } from '../components/auth/auth.component'
import { LoadingSpinnerComponent } from '../components/loading-spinner/loading-spinner.component'
import { AuthInterceptorService } from '../services/auth-interceptor.service'
import { AlertComponent } from '../components/alert/alert.component'
import { PlaceholderDirective } from '../utils/placeholder.directive'
import { RecipesModule } from '../recipes/recipes.module'

@NgModule({
  declarations: [
    AppComponent,
    ShoppingListComponent,
    ShoppingListEditComponent,
    HeaderComponent,
    AuthComponent,
    LoadingSpinnerComponent,
    AlertComponent,
    PlaceholderDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RecipesModule
  ],
  providers: [
    ShoppingListService,
    RecipeService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

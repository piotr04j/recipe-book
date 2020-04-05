import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { ShoppingListComponent } from '../components/shopping-list/shopping-list.component'
import { ShoppingListEditComponent } from '../components/shopping-list-edit/shopping-list-edit.component'
import { RecipeItemComponent } from '../components/recipe-item/recipe-item.component'
import { RecipeDetailComponent } from '../components/recipe-detail/recipe-detail.component'
import { RecipeListComponent } from '../components/recipe-list/recipe-list.component';
import { HeaderComponent } from '../components/header/header.component';
import { RecipesComponent } from '../components/recipes/recipes.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ShoppingListService } from '../services/shopping-list.service';
import { RecipeStartComponent } from '../components/recipe-start/recipe-start.component';
import { RecipeEditComponent } from '../components/recipe-edit/recipe-edit.component'
import { RecipeService } from '../services/recipe.service'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { AuthComponent } from '../components/auth/auth.component'
import { LoadingSpinnerComponent } from '../components/loading-spinner/loading-spinner.component'
import { AuthInterceptorService } from '../services/auth-interceptor.service'

@NgModule({
  declarations: [
    AppComponent,
    ShoppingListComponent,
    ShoppingListEditComponent,
    RecipeItemComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    HeaderComponent,
    RecipesComponent,
    RecipeStartComponent,
    RecipeEditComponent,
    AuthComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    ShoppingListService,
    RecipeService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

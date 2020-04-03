import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { RecipesComponent } from '../components/recipes/recipes.component'
import { ShoppingListComponent } from '../components/shopping-list/shopping-list.component'
import { RecipeStartComponent } from '../components/recipe-start/recipe-start.component'
import { RecipeDetailComponent } from '../components/recipe-detail/recipe-detail.component'
import { RecipeEditComponent } from '../components/recipe-edit/recipe-edit.component'
import { RecipesResolverService } from '../services/recipes-resolver.service'

const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  { path: 'recipes', component: RecipesComponent, children:
      [
        { path: '', component: RecipeStartComponent },
        { path: 'new', component: RecipeEditComponent },
        { path: ':id', component: RecipeDetailComponent, resolve: [RecipesResolverService] },
        { path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolverService] }
      ]
  },
  { path: 'shopping-list', component: ShoppingListComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
}
//TODO resolve problem with bug and check empty ingredients after fetch

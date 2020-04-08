import { NgModule } from '@angular/core'
import { RecipesComponent } from '../components/recipes/recipes.component'
import { AuthGuardService } from '../services/auth-guard.service'
import { RecipeStartComponent } from '../components/recipe-start/recipe-start.component'
import { RecipeEditComponent } from '../components/recipe-edit/recipe-edit.component'
import { RecipeDetailComponent } from '../components/recipe-detail/recipe-detail.component'
import { RecipesResolverService } from '../services/recipes-resolver.service'
import { RouterModule, Routes } from '@angular/router'

const routes: Routes =  [
    { path: 'recipes', component: RecipesComponent, canActivate: [AuthGuardService], children:
      [
        { path: '', component: RecipeStartComponent },
        { path: 'new', component: RecipeEditComponent },
        { path: ':id', component: RecipeDetailComponent, resolve: [RecipesResolverService] },
        { path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolverService] }
      ]
    }
  ]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class RecipesRoutnigModule {


}

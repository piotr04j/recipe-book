import { NgModule } from '@angular/core'
import { RecipeItemComponent } from '../components/recipe-item/recipe-item.component'
import { RecipeListComponent } from '../components/recipe-list/recipe-list.component'
import { RecipeDetailComponent } from '../components/recipe-detail/recipe-detail.component'
import { RecipesComponent } from '../components/recipes/recipes.component'
import { RecipeStartComponent } from '../components/recipe-start/recipe-start.component'
import { RecipeEditComponent } from '../components/recipe-edit/recipe-edit.component'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'
import { RecipesRoutnigModule } from './recipes-routnig.module'

@NgModule({
  declarations: [
    RecipeItemComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipesComponent,
    RecipeStartComponent,
    RecipeEditComponent,
  ],
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    RecipesRoutnigModule
  ],
  exports: [
    RecipeItemComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipesComponent,
    RecipeStartComponent,
    RecipeEditComponent,
  ]
})
export class RecipesModule {

}

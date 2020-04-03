import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router'
import { Recipe } from '../models/recipe.model'
import { DataStorageService } from './data-storage.service'
import { Observable } from 'rxjs'
import { RecipeService } from './recipe.service'

@Injectable({
  providedIn: 'root'
})
export class RecipesResolverService implements Resolve<Recipe[]> {
  constructor (private dataStorageService: DataStorageService, private recipeService: RecipeService) {}

  resolve (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Recipe[] {
    const recipes: Recipe[] = this.recipeService.getRecipes()

    if (recipes.length === 0) {
      return this.dataStorageService.fetchRecipes()
    } else {
      return recipes
    }
  }
}

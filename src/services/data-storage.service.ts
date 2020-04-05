import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { RecipeService } from './recipe.service'
import { Recipe } from '../models/recipe.model'
import { exhaustMap, map, take, tap } from 'rxjs/operators'
import { AuthService } from './auth.service'
import { User } from '../models/user.model'

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  constructor (private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes()
    this.http.put('https://recipe-book-b7138.firebaseio.com/recipes.json', recipes).subscribe( data => {
    })
  }

  fetchRecipes() {

    return this.http.get<Recipe[]>('https://recipe-book-b7138.firebaseio.com/recipes.json',).pipe(
      map( (recipes: Recipe[])  => {
        return recipes.map( recipe => {
          return { ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : []
          }
        })
      }),
      tap( (recipes: Recipe[]) => {
        this.recipeService.setRecipes(recipes)
      })
    )
  }
}

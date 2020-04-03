import { Recipe } from '../models/recipe.model'
import { EventEmitter, Injectable } from '@angular/core'
import { Ingredient } from '../models/ingredient.model'
import { ShoppingListService } from './shopping-list.service'
import { Subject } from 'rxjs'

@Injectable()
export class RecipeService {

  recipeChanged = new Subject<Recipe[]>()

  private recipes: Recipe[] = []

  constructor (private shoppingListService: ShoppingListService) {}

  addIngredientToShoppingList(ingredients: Ingredient[]) {
      this.shoppingListService.addIngredients(ingredients)
  }

  getRecipes() {
    return [ ...this.recipes ]
  }

  getRecipe(index: number) {
    return this.recipes[index]
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe)
    this.recipeChanged.next([...this.recipes])
  }

  editRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe
    this.recipeChanged.next([...this.recipes])
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1)
    this.recipeChanged.next([...this.recipes])
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes
    this.recipeChanged.next([...this.recipes])
  }
}



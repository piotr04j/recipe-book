import { Recipe } from '../models/recipe.model'
import { EventEmitter, Injectable } from '@angular/core'
import { Ingredient } from '../models/ingredient.model'
import { ShoppingListService } from './shopping-list.service'

@Injectable()
export class RecipeService {

  public recipeSelected = new EventEmitter<Recipe>()

  private recipes: Recipe[] = [
    new Recipe(
      'A recipe',
      'Just do it!',
      'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      [ new Ingredient('Lemon',1), new Ingredient('Potato', 4)]
    )
  ]

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
}



import { Ingredient } from '../models/ingredient.model'
import { Subject } from 'rxjs'

export class ShoppingListService {

  ingredientsChanged = new Subject<Ingredient[]>()

  private ingredients = [
    new Ingredient('cucumber', 2)
  ]

  ingredientAdded = new Subject<Ingredient>()

  getIngredients() {
    return [ ...this.ingredients]
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient)
    this.ingredientsChanged.next([ ...this.ingredients])
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients)
    this.ingredientsChanged.next([ ...this.ingredients])
  }
}

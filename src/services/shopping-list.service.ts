import { Ingredient } from '../models/ingredient.model'
import { EventEmitter } from '@angular/core'

export class ShoppingListService {

  ingredientsChanged = new EventEmitter<Ingredient[]>()

  private ingredients = [
    new Ingredient('cucumber', 2)
  ]

  ingredientAdded = new EventEmitter<Ingredient>()

  getIngredients() {
    return [ ...this.ingredients]
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient)
    this.ingredientsChanged.emit([ ...this.ingredients])
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients)
    this.ingredientsChanged.emit([ ...this.ingredients])
  }
}

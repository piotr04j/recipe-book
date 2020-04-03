import { Ingredient } from '../models/ingredient.model'
import { Subject } from 'rxjs'

export class ShoppingListService {

  startingEdited = new Subject<number>()
  ingredientsChanged = new Subject<Ingredient[]>()

  private ingredients = [
    new Ingredient('cucumber', 2)
  ]

  ingredientAdded = new Subject<Ingredient>()

  getIngredients() {
    return [ ...this.ingredients]
  }

  getIngredient(index: number ){
    return this.ingredients[index]
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient)
    this.ingredientsChanged.next([ ...this.ingredients])
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients)
    this.ingredientsChanged.next([ ...this.ingredients])
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient
    this.ingredientsChanged.next([...this.ingredients])
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1)
    this.ingredientsChanged.next([...this.ingredients])
  }
}

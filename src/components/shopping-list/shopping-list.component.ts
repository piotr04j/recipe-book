import { Component, OnInit } from '@angular/core'
import { Ingredient } from '../../models/ingredient.model'

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})

export class ShoppingListComponent implements OnInit {

  ingredients = [
    new Ingredient('cucumber', 2)
  ]

  constructor () {}

  ngOnInit (): void {
  }

  onIngredientAdded (ingredient: Ingredient) {
    this.ingredients.push(ingredient)
  }
}


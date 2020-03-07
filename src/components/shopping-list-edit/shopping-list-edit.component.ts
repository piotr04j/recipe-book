import { Component, ElementRef, ViewChild } from '@angular/core'
import { Ingredient } from '../../models/ingredient.model'
import { ShoppingListService } from '../../services/shopping-list.service'

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.scss']
})

export class ShoppingListEditComponent {

  @ViewChild('nameInput') nameInputRef: ElementRef
  @ViewChild('amountInput') amountInputRef: ElementRef

  constructor (private shoppingListService: ShoppingListService) {}

  onAddIngredient() {
    const ingredient = new Ingredient(this.nameInputRef.nativeElement.value, this.amountInputRef.nativeElement.value )
    this.shoppingListService.addIngredient(ingredient)
  }

}

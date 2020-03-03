import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core'
import { Ingredient } from '../../models/ingredient.model'

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.scss']
})

export class ShoppingListEditComponent {

  @ViewChild('nameInput') nameInputRef: ElementRef
  @ViewChild('amountInput') amountInputRef: ElementRef
  @Output() ingredientAdded = new EventEmitter<Ingredient>()


  onAddIngredient() {
    const ingredient = new Ingredient(this.nameInputRef.nativeElement.value, this.amountInputRef.nativeElement.value )
    this.ingredientAdded.emit(ingredient)
  }

}

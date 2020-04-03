import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { Ingredient } from '../../models/ingredient.model'
import { ShoppingListService } from '../../services/shopping-list.service'
import { NgForm } from '@angular/forms'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.scss']
})

export class ShoppingListEditComponent implements OnInit, OnDestroy {

  @ViewChild('f', {static: false}) slForm: NgForm
  subscription: Subscription
  editMode: boolean = false
  editedItemIndex: number
  editedItem: Ingredient
  constructor (private shoppingListService: ShoppingListService) {}

  ngOnInit (): void {
    this.subscription = this.shoppingListService.startingEdited.subscribe((index: number) => {
      this.editedItemIndex = index
      this.editMode = true
      this.editedItem = this.shoppingListService.getIngredient(index)
      this.slForm.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount
      })
    })
  }

  onSubmit(form: NgForm) {
    const value = form.value
    const ingredient = new Ingredient(value.name, value.amount)
    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editedItemIndex, ingredient)
    } else {
      this.shoppingListService.addIngredient(ingredient)
    }
    this.editMode = false
    form.reset()
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  onClearForm () {
    this.slForm.reset()
    this.editMode = false
  }

  onDeleteIngredient () {
    this.shoppingListService.deleteIngredient(this.editedItemIndex)
    this.onClearForm()
  }
}

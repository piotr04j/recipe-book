import { Component, OnInit } from '@angular/core'
import { Recipe } from '../../models/recipe.model'

@Component({
  selector: 'app-recipe-list',
  templateUrl: 'recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})

export class RecipeListComponent implements OnInit {

  recipes: Recipe[] = [
    new Recipe(
    'A recipe',
    'Just do it!',
    'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
    )
  ]

  constructor () {

  }

  ngOnInit() {

  }

}

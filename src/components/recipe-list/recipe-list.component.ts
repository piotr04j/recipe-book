import { Component, OnDestroy, OnInit } from '@angular/core'
import { Recipe } from '../../models/recipe.model'
import { RecipeService } from '../../services/recipe.service'
import { ActivatedRoute, Router } from '@angular/router'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-recipe-list',
  templateUrl: 'recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})

export class RecipeListComponent implements OnInit, OnDestroy {
  subscription: Subscription
  recipes: Recipe[]

  constructor (private recipeService: RecipeService, private router: Router, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.subscription = this.recipeService.recipeChanged.subscribe((recipes: Recipe[]) =>{
      this.recipes = recipes
    })
    this.recipes = this.recipeService.getRecipes()
  }

  onNewRecipe () {
    this.router.navigate(['new'], { relativeTo: this.route })
  }

  ngOnDestroy (): void {
    this.subscription.unsubscribe()
  }
}

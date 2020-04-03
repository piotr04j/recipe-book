import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms'
import { RecipeService } from '../../services/recipe.service'
import { Recipe } from '../../models/recipe.model'

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {
  id: number
  editMode: boolean = false
  recipeForm: FormGroup
  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe( ( params: Params) => {
      this.id = +params['id']
      this.editMode = params['id'] != null
      this.initForm()
    })
  }

  private initForm() {
    let recipeName = ''
    let imageUrl = ''
    let description = ''
    let recipeIngredients = new FormArray([])

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id)
      recipeName = recipe.name
      imageUrl = recipe.imagePath
      description = recipe.description
      if(recipe['ingredients']){
        for (let ingredient of recipe.ingredients){
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [
                Validators.required ,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
            })
          )
        }
      }
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(imageUrl, Validators.required),
      'description': new FormControl(description, Validators.required),
      'ingredients': recipeIngredients
    })
  }

  get controls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onSubmit () {
    const newRecipe: Recipe = new Recipe(
      this.recipeForm.value.name,
      this.recipeForm.value.description,
      this.recipeForm.value.imagePath,
      this.recipeForm.value.ingredients
    )

    if(this.editMode){
      this.recipeService.editRecipe(this.id, newRecipe)
    } else {
      this.recipeService.addRecipe(newRecipe)
    }
    this.onCancelForm()
  }

  onAddIngredient () {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null,[
          Validators.required ,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    )
  }

  onCancelForm () {
    this.router.navigate(['../'], {relativeTo: this.route})
  }

  onDeleteIngredient (index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index)
  }
}

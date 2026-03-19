import { ChangeDetectionStrategy, Component, inject, signal, computed } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { RecipeCategory, Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.html',
  styleUrls: ['./recipe-form.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ReactiveFormsModule, TitleCasePipe],
})

export class RecipeFormComponent {
  private readonly fb = inject(FormBuilder);
  private readonly recipeService = inject(RecipeService);
  private readonly router = inject(Router);

  readonly categories = Object.values(RecipeCategory);
  readonly isSubmitting = signal(false);
  readonly form: FormGroup;

  constructor() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      ingredients: this.fb.array([
        this.fb.control('', Validators.required)
      ], Validators.required),
      instructions: ['', Validators.required]
    });
  }

  get ingredients(): FormArray {
    return this.form.get('ingredients') as FormArray;
  }

  // Computed signal for form validity (optional, for template use)
  readonly isFormValid = computed(() => this.form.valid);

  async onSubmit() {
    if (this.form.invalid) return;

    this.isSubmitting.set(true);
    try {
      const recipeData = {
        name: this.form.value.name,
        category: this.form.value.category as RecipeCategory,
        ingredients: this.form.value.ingredients.filter((i: string) => i.trim() !== ''),
        instructions: this.form.value.instructions,
        imageUrl: 'https://images.unsplash.com/photo-1466632311177-d3d6396e9521?q=80&w=2000'
      };

      await this.recipeService.addRecipe(recipeData);
      this.router.navigate(['/recipes']);
    } finally {
      this.isSubmitting.set(false);
    }
  }

  addIngredient() {
    this.ingredients.push(this.fb.control('', Validators.required));
  }

  removeIngredient(index: number) {
    if (this.ingredients.length > 1) {
      this.ingredients.removeAt(index);
    }
  }

  updateIngredient(index: number, value: string) {
    this.ingredients.at(index).setValue(value);
  }
}

import { ChangeDetectionStrategy, Component, output, signal, computed } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { TitleCasePipe } from '@angular/common';
import { RecipeCategory, Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.html',
  styleUrls: ['./recipe-form.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ReactiveFormsModule, TitleCasePipe],
})

export class RecipeFormComponent {
  readonly categories = Object.values(RecipeCategory);

  // Use signals for local state if needed (e.g., loading, error, etc.)
  readonly isSubmitting = signal(false);

  // Reactive Form
  readonly form: FormGroup;

  recipeCreated = output<Omit<Recipe, 'id' | 'imageUrl'>>();

  constructor(private readonly fb: FormBuilder) {
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

  onSubmit() {
    this.isSubmitting.set(true);
    if (this.form.valid) {
      this.recipeCreated.emit({
        name: this.form.value.name,
        category: this.form.value.category as RecipeCategory,
        ingredients: this.form.value.ingredients,
        instructions: this.form.value.instructions
      });
      this.form.reset();
      // Reset ingredients to one empty field
      this.ingredients.clear();
      this.ingredients.push(this.fb.control('', Validators.required));
    }
    this.isSubmitting.set(false);
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

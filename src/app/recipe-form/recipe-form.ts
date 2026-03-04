import { ChangeDetectionStrategy, Component, output, signal } from '@angular/core';
import { form, field, Validators } from '@angular/forms';
import { RecipeCategory, Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-form',
  standalone: true,
  templateUrl: './recipe-form.html',
  styleUrls: ['./recipe-form.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeFormComponent {
  readonly categories = Object.values(RecipeCategory);

  form = form({
    name: field('', { validators: [Validators.required] }),
    category: field<RecipeCategory | ''>('', { validators: [Validators.required] }),
    ingredients: field<string[]>([''], { validators: [Validators.required] }),
    instructions: field('', { validators: [Validators.required] })
  });

  recipeCreated = output<Omit<Recipe, 'id' | 'imageUrl'>>();

  onSubmit() {
    if (this.form.valid()) {
      this.recipeCreated.emit({
        name: this.form.controls.name.value(),
        category: this.form.controls.category.value() as RecipeCategory,
        ingredients: this.form.controls.ingredients.value(),
        instructions: this.form.controls.instructions.value()
      });
      this.form.reset();
    }
  }

  addIngredient() {
    const current = this.form.controls.ingredients.value();
    this.form.controls.ingredients.set([...current, '']);
  }

  removeIngredient(index: number) {
    const current = this.form.controls.ingredients.value();
    this.form.controls.ingredients.set(current.filter((_, i) => i !== index));
  }

  updateIngredient(index: number, value: string) {
    const current = this.form.controls.ingredients.value();
    const updated = [...current];
    updated[index] = value;
    this.form.controls.ingredients.set(updated);
  }
}

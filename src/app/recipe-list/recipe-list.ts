import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { RecipeCardComponent } from '../recipe-card/recipe-card';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [RecipeCardComponent],
  templateUrl: './recipe-list.html',
  styleUrls: ['./recipe-list.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeListComponent {
  private readonly recipeService = inject(RecipeService);
  recipes = this.recipeService.recipes;
  activeRecipe = signal<string | null>(null);

  handleRecipeSelected(id: string) {
    this.activeRecipe.set(id);
  }
}

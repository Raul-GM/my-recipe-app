import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  input,
  output,
  computed,
} from '@angular/core';
import { Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { RecipeCardComponent } from '../recipe-card/recipe-card';
import { RecipeCategory, Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  imports: [RecipeCardComponent],
  templateUrl: './recipe-list.html',
  styleUrls: ['./recipe-list.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeListComponent {
  private readonly recipeService = inject(RecipeService);
  private readonly router = inject(Router);
  category = input<RecipeCategory | null>();
  selected = output<string>();
  activeRecipe = signal<string | null>(null);

  recipes = computed(() => {
    const all = this.recipeService.recipes();
    const cat = this.category();
    return cat ? all.filter((r) => r.category === cat) : all;
  });

  handleRecipeSelected(id: string) {
    this.activeRecipe.set(id);
    this.selected.emit(id);
    this.router.navigate(['/recipes', id]);
  }
}

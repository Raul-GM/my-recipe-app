import { ChangeDetectionStrategy, Component, signal, computed, inject } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CategoryFilterComponent } from '../category-filter/category-filter';
import { RecipeListComponent } from '../recipe-list/recipe-list';
import { Recipe, RecipeCategory } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-core',
  standalone: true,
  imports: [CategoryFilterComponent, RecipeListComponent, RouterOutlet, RouterLink],
  templateUrl: './app-root.html',
  styleUrls: ['./app-root.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppRootComponent {
  // Señales para la UI
  selectedCategory = signal<RecipeCategory | null>(null);

  private readonly recipeService = inject(RecipeService);

  // Cambiar categoría
  onCategoryChanged(category: RecipeCategory) {
    this.selectedCategory.set(category);
  }
}

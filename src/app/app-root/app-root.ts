import { ChangeDetectionStrategy, Component, signal, computed, inject } from '@angular/core';
import { CategoryFilterComponent } from '../category-filter/category-filter';
import { RecipeListComponent } from '../recipe-list/recipe-list';
import { RecipeDetailComponent } from '../recipe-detail/recipe-detail';
import { RecipeFormComponent } from '../recipe-form/recipe-form';
import { Recipe, RecipeCategory } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-core',
  standalone: true,
  imports: [CategoryFilterComponent, RecipeListComponent, RecipeDetailComponent, RecipeFormComponent],
  templateUrl: './app-root.html',
  styleUrls: ['./app-root.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppRootComponent {
  // Señales para la UI
  showForm = signal(false);
  selectedCategory = signal<RecipeCategory | null>(null);
  selectedRecipe = signal<Recipe | undefined>(undefined);

  private readonly recipeService = inject(RecipeService);

  // Alternar entre lista y formulario
  toggleForm() {
    this.showForm.update(v => !v);
    if (this.showForm()) {
      this.selectedRecipe.set(undefined);
    }
  }

  // Cambiar categoría
  onCategoryChanged(category: RecipeCategory) {
    this.selectedCategory.set(category);
    this.selectedRecipe.set(undefined);
  }

  // Seleccionar receta
  onRecipeSelected(recipeId: string) {
    const recipes = this.recipeService.recipes();
    const recipe = recipes.find(r => r.id === recipeId);
    this.selectedRecipe.set(recipe);
    this.showForm.set(false);
  }

  // Cuando se crea una receta
  async onRecipeCreated(recipeData: Omit<Recipe, 'id' | 'imageUrl'>) {
    const newRecipeData: Omit<Recipe, 'id'> = {
      ...recipeData,
      imageUrl: 'https://images.unsplash.com/photo-1466632311177-d3d6396e9521?q=80&w=2000' // Placeholder image
    };

    await this.recipeService.addRecipe(newRecipeData);
    this.showForm.set(false);
  }

  // Limpiar selección
  clearSelection() {
    this.selectedRecipe.set(undefined);
  }
}

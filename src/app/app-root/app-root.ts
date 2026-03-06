import { ChangeDetectionStrategy, Component, signal, computed } from '@angular/core';
import { CategoryFilterComponent } from '../category-filter/category-filter';
import { RecipeListComponent } from '../recipe-list/recipe-list';
import { RecipeDetailComponent } from '../recipe-detail/recipe-detail';
import { RecipeFormComponent } from '../recipe-form/recipe-form';
import { Recipe, RecipeCategory } from '../recipe.model';

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
    // Aquí deberías buscar la receta por ID en tu servicio o lista
    // Por simplicidad, solo guardamos el ID
    this.selectedRecipe.set({ id: recipeId } as Recipe);
    this.showForm.set(false);
  }

  // Cuando se crea una receta
  onRecipeCreated(recipe: Omit<Recipe, 'id' | 'imageUrl'>) {
    // Aquí deberías añadir la receta al servicio
    this.showForm.set(false);
    // Podrías actualizar la lista de recetas si gestionas el estado aquí
  }

  // Limpiar selección
  clearSelection() {
    this.selectedRecipe.set(undefined);
  }
}

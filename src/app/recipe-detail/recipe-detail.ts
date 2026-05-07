import { ChangeDetectionStrategy, Component, inject, computed, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  templateUrl: './recipe-detail.html',
  styleUrls: ['./recipe-detail.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly recipeService = inject(RecipeService);

  readonly isDeleting = signal(false);

  private readonly id = toSignal(
    this.route.paramMap.pipe(map(params => params.get('id')))
  );

  recipe = computed(() => {
    const recipeId = this.id();
    return recipeId ? this.recipeService.getRecipeById(recipeId) : undefined;
  });

  async onDelete() {
    const id = this.id();
    if (!id || !confirm('¿Eliminar esta receta?')) return;
    
    this.isDeleting.set(true);
    try {
      await this.recipeService.deleteRecipe(id);
      this.router.navigate(['/recipes']);
    } finally {
      this.isDeleting.set(false);
    }
  }

  onEdit() {
    const id = this.id();
    if (id) {
      this.router.navigate(['/recipes', id, 'edit']);
    }
  }
}

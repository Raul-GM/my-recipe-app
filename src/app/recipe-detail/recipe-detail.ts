import { ChangeDetectionStrategy, Component, inject, computed } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  templateUrl: './recipe-detail.html',
  styleUrls: ['./recipe-detail.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly recipeService = inject(RecipeService);

  private readonly id = toSignal(this.route.paramMap.pipe(map((params) => params.get('id'))));

  recipe = computed(() => {
    const recipeId = this.id();
    return recipeId ? this.recipeService.getRecipeById(recipeId) : undefined;
  });
}

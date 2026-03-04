import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  templateUrl: './recipe-detail.html',
  styleUrls: ['./recipe-detail.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeDetailComponent {
  recipe = input<Recipe | undefined>();
}

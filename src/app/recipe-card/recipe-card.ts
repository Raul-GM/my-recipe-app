import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './recipe-card.html',
  styleUrls: ['./recipe-card.css']
})
export class RecipeCardComponent {
  recipe = input.required<Recipe>();
  selected = output<string>();
}

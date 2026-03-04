
import { Component, ChangeDetectionStrategy, signal, output } from '@angular/core';
import { RecipeCategory } from '../recipe.model';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-category-filter',
  standalone: true,
  templateUrl: './category-filter.html',
  styleUrls: ['./category-filter.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TitleCasePipe],
})
export class CategoryFilterComponent {
  readonly categories = Object.values(RecipeCategory);
  selectedCategory = signal<RecipeCategory>(this.categories[0]);
  categoryChanged = output<RecipeCategory>();

  selectCategory(category: RecipeCategory) {
    this.selectedCategory.set(category);
    this.categoryChanged.emit(category);
  }
}

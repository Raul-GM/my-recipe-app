import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('my-recipe-app');
}
export * from './recipe-card/recipe-card';
export * from './recipe-list/recipe-list';
export * from './category-filter/category-filter';
export * from './recipe-detail/recipe-detail';
export * from './recipe-form/recipe-form';

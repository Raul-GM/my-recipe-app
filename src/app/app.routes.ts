import { Routes } from '@angular/router';
import { AppRootComponent } from './app-root/app-root';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail';
import { RecipeFormComponent } from './recipe-form/recipe-form';

export const routes: Routes = [
  { path: '', redirectTo: 'recipes', pathMatch: 'full' },
  {
    path: 'recipes',
    component: AppRootComponent,
    children: [
      { path: 'new', component: RecipeFormComponent },
      { path: ':id', component: RecipeDetailComponent },
    ],
  },
];

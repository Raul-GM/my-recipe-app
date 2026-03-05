import { signal, computed, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { supabase } from './supabase.config';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  // Signal para almacenar la lista de recetas
  private readonly _recipes = signal<Recipe[]>([]);

  // Exponer las recetas como readonly
  readonly recipes = this._recipes.asReadonly();

  // Computed para obtener el número de recetas
  readonly recipeCount = computed(() => this._recipes().length);

  constructor() {
    // Cargar recetas al inicializar el servicio
    this.fetchRecipes();
  }

  async fetchRecipes() {
    const { data, error } = await supabase
      .from('recipes')
      .select('*');
    if (!error && data) {
      this._recipes.set(data as Recipe[]);
    }
  }

  async addRecipe(recipe: Recipe) {
    const { data, error } = await supabase
      .from('recipes')
      .insert([recipe])
      .select();
    if (!error && data) {
      this._recipes.update((recipes) => [...recipes, ...data as Recipe[]]);
    }
  }

  async deleteRecipe(id: string) {
    const { error } = await supabase
      .from('recipes')
      .delete()
      .eq('id', id);
    if (!error) {
      this._recipes.update((recipes) => recipes.filter(r => r.id !== id));
    }
  }
}
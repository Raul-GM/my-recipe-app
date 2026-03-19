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

  getRecipeById(id: string) {
    return this._recipes().find(r => r.id === id);
  }

  constructor() {
    // Cargar recetas al inicializar el servicio
    this.fetchRecipes();
  }

  async fetchRecipes() {
    try {
      const { data, error } = await supabase
        .from('recipes')
        .select('*');
      if (error) throw error;
      if (data) {
        this._recipes.set(data as Recipe[]);
      }
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  }

  async addRecipe(recipe: Omit<Recipe, 'id'>) {
    try {
      const { data, error } = await supabase
        .from('recipes')
        .insert([recipe])
        .select();
      if (error) throw error;
      if (data) {
        this._recipes.update((recipes) => [...recipes, ...data as Recipe[]]);
      }
    } catch (error) {
      console.error('Error adding recipe:', error);
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
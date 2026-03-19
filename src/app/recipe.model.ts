export enum RecipeCategory {
  Breakfast = 'breakfast',
  Lunch = 'lunch',
  Dinner = 'dinner',
  Dessert = 'dessert',
  Snack = 'snack',
  Other = 'other',
}

export interface Recipe {
  id: string | number;
  name: string;
  ingredients: string[];
  instructions: string;
  category: RecipeCategory;
  imageUrl: string;
}

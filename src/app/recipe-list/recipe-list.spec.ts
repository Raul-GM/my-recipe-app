import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RecipeListComponent } from './recipe-list';
import { RecipeService } from '../recipe.service';
import { Recipe, RecipeCategory } from '../recipe.model';
import { signal } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeCardComponent } from '../recipe-card/recipe-card';

describe('RecipeListComponent', () => {
  let component: RecipeListComponent;
  let fixture: ComponentFixture<RecipeListComponent>;
  let mockRecipeService: any;
  let mockRouter: any;

  const mockRecipes: Recipe[] = [
    {
      id: '1',
      name: 'Spaghetti',
      ingredients: [],
      instructions: '',
      category: RecipeCategory.Lunch,
      imageUrl: '',
    },
    {
      id: '2',
      name: 'Oatmeal',
      ingredients: [],
      instructions: '',
      category: RecipeCategory.Breakfast,
      imageUrl: '',
    },
    {
      id: '3',
      name: 'Salad',
      ingredients: [],
      instructions: '',
      category: RecipeCategory.Lunch,
      imageUrl: '',
    },
  ];

  beforeEach(async () => {
    mockRecipeService = {
      recipes: signal<Recipe[]>(mockRecipes),
    };

    mockRouter = {
      navigate: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [RecipeListComponent, RecipeCardComponent],
      providers: [
        { provide: RecipeService, useValue: mockRecipeService },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RecipeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all recipes when no category filter is applied', () => {
    const cards = fixture.nativeElement.querySelectorAll('app-recipe-card');
    expect(cards.length).toBe(mockRecipes.length);
  });

  it('should filter recipes when category input is set', () => {
    // Set category to Lunch
    fixture.componentRef.setInput('category', RecipeCategory.Lunch);
    fixture.detectChanges();

    const expectedLunchCount = mockRecipes.filter(
      (r) => r.category === RecipeCategory.Lunch,
    ).length;
    const cards = fixture.nativeElement.querySelectorAll('app-recipe-card');
    expect(cards.length).toBe(expectedLunchCount);
  });

  it('should update filtering when category input changes', () => {
    // Lunch first
    fixture.componentRef.setInput('category', RecipeCategory.Lunch);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('app-recipe-card').length).toBe(2);

    // Change to Breakfast
    fixture.componentRef.setInput('category', RecipeCategory.Breakfast);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('app-recipe-card').length).toBe(1);

    // Clear filter
    fixture.componentRef.setInput('category', null);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('app-recipe-card').length).toBe(3);
  });

  it('should handle recipe selection correctly', () => {
    const spy = vi.fn();
    component.selected.subscribe(spy);

    component.handleRecipeSelected('3');

    expect(component.activeRecipe()).toBe('3');
    expect(spy).toHaveBeenCalledWith('3');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/recipes', '3']);
  });

  it('should show the empty state message when no recipes are available for the selected category', () => {
    // Filtering by a category with no recipes
    fixture.componentRef.setInput('category', RecipeCategory.Dessert);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('app-recipe-card').length).toBe(0);
    expect(compiled.querySelector('.recipe-list__empty')).toBeTruthy();
  });
});

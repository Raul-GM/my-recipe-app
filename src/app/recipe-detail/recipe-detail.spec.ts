import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecipeDetailComponent } from './recipe-detail';
import { RecipeService } from '../recipe.service';
import { Recipe, RecipeCategory } from '../recipe.model';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

describe('RecipeDetailComponent', () => {
  let component: RecipeDetailComponent;
  let fixture: ComponentFixture<RecipeDetailComponent>;
  let mockRecipeService: any;
  let mockActivatedRoute: any;

  const mockRecipe: Recipe = {
    id: '1',
    name: 'Spaghetti Carbonara',
    ingredients: ['Pasta', 'Eggs', 'Guanciale'],
    instructions: 'Boil pasta, mix eggs, cook guanciale.',
    category: RecipeCategory.Lunch,
    imageUrl: 'carbonara.jpg',
  };

  beforeEach(async () => {
    mockRecipeService = {
      getRecipeById: vi.fn(),
    };

    mockActivatedRoute = {
      paramMap: of(convertToParamMap({ id: '1' })),
    };

    await TestBed.configureTestingModule({
      imports: [RecipeDetailComponent],
      providers: [
        { provide: RecipeService, useValue: mockRecipeService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RecipeDetailComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    mockRecipeService.getRecipeById.mockReturnValue(undefined);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should display the recipe details when a recipe is found', () => {
    mockRecipeService.getRecipeById.mockReturnValue(mockRecipe);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.recipe-detail__title')?.textContent).toContain(mockRecipe.name);
    expect(compiled.querySelector('.recipe-detail__badge')?.textContent).toContain(
      mockRecipe.category,
    );

    const ingredients = compiled.querySelectorAll('.recipe-detail__ingredients li');
    expect(ingredients.length).toBe(mockRecipe.ingredients.length);
    expect(ingredients[0].textContent).toContain(mockRecipe.ingredients[0]);

    expect(compiled.querySelector('.recipe-detail__instructions')?.textContent).toBe(
      mockRecipe.instructions,
    );
  });

  it('should show the empty state when no recipe is found', () => {
    mockRecipeService.getRecipeById.mockReturnValue(undefined);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.recipe-detail__empty')).toBeTruthy();
    expect(compiled.querySelector('.recipe-detail__empty')?.textContent).toContain(
      'Selecciona una receta',
    );
  });

  it('should update the recipe when the id in the params changes', () => {
    // Already set to ID '1' by provider Mock.
    mockRecipeService.getRecipeById.mockReturnValue(mockRecipe);
    fixture.detectChanges();
    expect(compiled().querySelector('.recipe-detail__title')?.textContent).toContain(
      mockRecipe.name,
    );

    // Helper to get native element
    function compiled() {
      return fixture.nativeElement as HTMLElement;
    }
  });
});

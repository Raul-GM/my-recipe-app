import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecipeCardComponent } from './recipe-card';
import { Recipe, RecipeCategory } from '../recipe.model';

describe('RecipeCardComponent', () => {
  let component: RecipeCardComponent;
  let fixture: ComponentFixture<RecipeCardComponent>;

  const mockRecipe: Recipe = {
    id: '123',
    name: 'Spaghetti Carbonara',
    ingredients: ['Pasta', 'Eggs', 'Cheese', 'Bacon'],
    instructions: 'Boil pasta, mix eggs and cheese, combine.',
    category: RecipeCategory.Dinner,
    imageUrl: 'carbonara.jpg',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RecipeCardComponent);
    component = fixture.componentInstance;

    // As 'recipe' is a required input, we set it before first change detection
    fixture.componentRef.setInput('recipe', mockRecipe);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the recipe name', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')?.textContent).toContain(mockRecipe.name);
  });

  it('should display the recipe category as a badge', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const badge = compiled.querySelector('.badge');
    expect(badge?.textContent?.trim()).toBe(mockRecipe.category);
    expect(badge?.classList).toContain(`badge-${mockRecipe.category}`);
  });

  it('should emit selected output when clicked', () => {
    const spy = vi.fn();
    component.selected.subscribe(spy);

    const article = fixture.nativeElement.querySelector('article');
    article.click();

    expect(spy).toHaveBeenCalledWith('123');
  });
});

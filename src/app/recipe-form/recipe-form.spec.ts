import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecipeFormComponent } from './recipe-form';
import { ReactiveFormsModule, FormArray } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { Router } from '@angular/router';
import { RecipeCategory } from '../recipe.model';
import { TitleCasePipe } from '@angular/common';

describe('RecipeFormComponent', () => {
  let component: RecipeFormComponent;
  let fixture: ComponentFixture<RecipeFormComponent>;
  let mockRecipeService: any;
  let mockRouter: any;

  beforeEach(async () => {
    mockRecipeService = {
      addRecipe: vi.fn().mockResolvedValue(undefined),
    };

    mockRouter = {
      navigate: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [RecipeFormComponent, ReactiveFormsModule, TitleCasePipe],
      providers: [
        { provide: RecipeService, useValue: mockRecipeService },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RecipeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with an empty form except for one ingredient field', () => {
    expect(component.form.get('name')?.value).toBe('');
    expect(component.form.get('category')?.value).toBe('');
    expect(component.ingredients.length).toBe(1);
    expect(component.form.valid).toBe(false);
  });

  it('should allow adding and removing ingredients', () => {
    // Initial: 1 ingredient
    expect(component.ingredients.length).toBe(1);

    // Add ingredient
    component.addIngredient();
    expect(component.ingredients.length).toBe(2);

    // Add another
    component.addIngredient();
    expect(component.ingredients.length).toBe(3);

    // Remove middle one
    component.removeIngredient(1);
    expect(component.ingredients.length).toBe(2);

    // Should not remove last ingredient
    component.removeIngredient(0);
    component.removeIngredient(0);
    expect(component.ingredients.length).toBe(1);
  });

  it('should be valid when all required fields are filled', () => {
    component.form.patchValue({
      name: 'Test Recipe',
      category: RecipeCategory.Dinner,
      instructions: 'Do something',
    });
    // Set the first ingredient control value
    component.ingredients.at(0).setValue('Ingredient 1');

    fixture.detectChanges();
    expect(component.form.valid).toBe(true);
  });

  it('should show error messages when fields are touched and empty', () => {
    const nameControl = component.form.get('name');
    nameControl?.markAsTouched();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const errorSpan = compiled.querySelector('.form-error');
    expect(errorSpan?.textContent).toContain('El nombre es obligatorio');
  });

  it('should call recipeService.addRecipe and navigate to recipes list on valid submit', async () => {
    // Fill the form
    component.form.patchValue({
      name: 'New Recipe',
      category: RecipeCategory.Lunch,
      instructions: 'Prep instructions',
    });
    component.ingredients.at(0).setValue('Ingredient A');

    fixture.detectChanges();
    expect(component.form.valid).toBe(true);

    // Submit
    const submitPromise = component.onSubmit();

    // Check submitting state
    expect(component.isSubmitting()).toBe(true);

    await submitPromise;

    expect(mockRecipeService.addRecipe).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'New Recipe',
        category: RecipeCategory.Lunch,
        ingredients: ['Ingredient A'],
        instructions: 'Prep instructions',
      }),
    );

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/recipes']);
    expect(component.isSubmitting()).toBe(false);
  });

  it('should disable the submit button if the form is invalid', () => {
    const submitBtn = fixture.nativeElement.querySelector('.submit-btn') as HTMLButtonElement;
    expect(submitBtn.disabled).toBe(true);

    component.form.patchValue({
      name: 'Valid Name',
      category: RecipeCategory.Breakfast,
      instructions: 'Valid Instructions',
    });
    component.ingredients.at(0).setValue('Valid Ingredient');
    fixture.detectChanges();

    expect(submitBtn.disabled).toBe(false);
  });
});

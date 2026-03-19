import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoryFilterComponent } from './category-filter';
import { RecipeCategory } from '../recipe.model';
import { TitleCasePipe } from '@angular/common';

describe('CategoryFilterComponent', () => {
  let component: CategoryFilterComponent;
  let fixture: ComponentFixture<CategoryFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryFilterComponent, TitleCasePipe],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all categories from the enum', () => {
    const buttons = fixture.nativeElement.querySelectorAll('button');
    const categoriesCount = Object.values(RecipeCategory).length;
    expect(buttons.length).toBe(categoriesCount);
  });

  it('should highlight the first category by default', () => {
    const firstCategory = Object.values(RecipeCategory)[0];
    expect(component.selectedCategory()).toBe(firstCategory);

    const firstButton = fixture.nativeElement.querySelector('button');
    expect(firstButton.classList.contains('selected')).toBe(true);
    expect(firstButton.getAttribute('aria-pressed')).toBe('true');
  });

  it('should change selected category and emit event when a button is clicked', () => {
    const spy = vi.fn();
    component.categoryChanged.subscribe(spy);

    // Choose the second category (if available)
    const categories = Object.values(RecipeCategory);
    if (categories.length > 1) {
      const secondCategory = categories[1];
      const buttons = fixture.nativeElement.querySelectorAll('button');
      const secondButton = buttons[1] as HTMLButtonElement;

      secondButton.click();
      fixture.detectChanges();

      expect(component.selectedCategory()).toBe(secondCategory);
      expect(spy).toHaveBeenCalledWith(secondCategory);
      expect(secondButton.classList.contains('selected')).toBe(true);
    }
  });
});

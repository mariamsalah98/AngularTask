import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorizedproductsComponent } from './categorizedproducts.component';

describe('CategorizedproductsComponent', () => {
  let component: CategorizedproductsComponent;
  let fixture: ComponentFixture<CategorizedproductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategorizedproductsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategorizedproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

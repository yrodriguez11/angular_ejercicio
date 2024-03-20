import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryAddEditComponent } from './country-add-edit.component';

describe('CountryAddEditComponent', () => {
  let component: CountryAddEditComponent;
  let fixture: ComponentFixture<CountryAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountryAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountryAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

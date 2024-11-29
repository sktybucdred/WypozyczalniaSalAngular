import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularzRezerwacjiComponent } from './formularz-rezerwacji.component';

describe('FormularzRezerwacjiComponent', () => {
  let component: FormularzRezerwacjiComponent;
  let fixture: ComponentFixture<FormularzRezerwacjiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularzRezerwacjiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularzRezerwacjiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

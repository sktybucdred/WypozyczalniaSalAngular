import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularzSaliComponent } from './formularz-sali.component';

describe('FormularzSaliComponent', () => {
  let component: FormularzSaliComponent;
  let fixture: ComponentFixture<FormularzSaliComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularzSaliComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularzSaliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

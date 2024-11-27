import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSalaDialogComponent } from './add-sala-dialog.component';

describe('AddSalaDialogComponent', () => {
  let component: AddSalaDialogComponent;
  let fixture: ComponentFixture<AddSalaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddSalaDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSalaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

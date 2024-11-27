import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSalaDialogComponent } from './edit-sala-dialog.component';

describe('EditSalaDialogComponent', () => {
  let component: EditSalaDialogComponent;
  let fixture: ComponentFixture<EditSalaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditSalaDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSalaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

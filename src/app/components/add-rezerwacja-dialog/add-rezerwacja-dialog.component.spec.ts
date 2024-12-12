import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRezerwacjaDialogComponent } from './add-rezerwacja-dialog.component';

describe('AddRezerwacjaDialogComponent', () => {
  let component: AddRezerwacjaDialogComponent;
  let fixture: ComponentFixture<AddRezerwacjaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddRezerwacjaDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRezerwacjaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

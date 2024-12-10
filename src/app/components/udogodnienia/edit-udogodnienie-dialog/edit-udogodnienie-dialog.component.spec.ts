import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUdogodnienieDialogComponent } from './edit-udogodnienie-dialog.component';

describe('EditUdogodnienieDialogComponent', () => {
  let component: EditUdogodnienieDialogComponent;
  let fixture: ComponentFixture<EditUdogodnienieDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditUdogodnienieDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditUdogodnienieDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

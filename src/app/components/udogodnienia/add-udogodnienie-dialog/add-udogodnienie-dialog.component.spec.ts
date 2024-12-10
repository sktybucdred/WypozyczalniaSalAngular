import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUdogodnienieDialogComponent } from './add-udogodnienie-dialog.component';

describe('AddUdogodnienieDialogComponent', () => {
  let component: AddUdogodnienieDialogComponent;
  let fixture: ComponentFixture<AddUdogodnienieDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddUdogodnienieDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUdogodnienieDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

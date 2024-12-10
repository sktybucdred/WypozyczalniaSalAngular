import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UdogodnieniaDialogComponent } from './udogodnienia-dialog.component';

describe('UdogodnieniaDialogComponent', () => {
  let component: UdogodnieniaDialogComponent;
  let fixture: ComponentFixture<UdogodnieniaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UdogodnieniaDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UdogodnieniaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

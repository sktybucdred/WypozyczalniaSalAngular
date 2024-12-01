import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsSalaDialogComponent } from './details-sala-dialog.component';

describe('DetailsSalaDialogComponent', () => {
  let component: DetailsSalaDialogComponent;
  let fixture: ComponentFixture<DetailsSalaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsSalaDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsSalaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

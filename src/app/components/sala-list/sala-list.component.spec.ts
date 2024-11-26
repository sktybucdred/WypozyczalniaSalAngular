import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaListComponent } from './sala-list.component';

describe('SalaListComponent', () => {
  let component: SalaListComponent;
  let fixture: ComponentFixture<SalaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalaListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

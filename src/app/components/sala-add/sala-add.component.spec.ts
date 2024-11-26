import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaAddComponent } from './sala-add.component';

describe('SalaAddComponent', () => {
  let component: SalaAddComponent;
  let fixture: ComponentFixture<SalaAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalaAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalaAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

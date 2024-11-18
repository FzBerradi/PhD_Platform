import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CEDComponent } from './ced.component';

describe('CEDComponent', () => {
  let component: CEDComponent;
  let fixture: ComponentFixture<CEDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CEDComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CEDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

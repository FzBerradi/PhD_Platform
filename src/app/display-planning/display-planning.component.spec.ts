import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayPlanningComponent } from './display-planning.component';

describe('DisplayPlanningComponent', () => {
  let component: DisplayPlanningComponent;
  let fixture: ComponentFixture<DisplayPlanningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayPlanningComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DisplayPlanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

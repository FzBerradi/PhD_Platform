import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeBourseComponent } from './demande-bourse.component';

describe('DemandeBourseComponent', () => {
  let component: DemandeBourseComponent;
  let fixture: ComponentFixture<DemandeBourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemandeBourseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DemandeBourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

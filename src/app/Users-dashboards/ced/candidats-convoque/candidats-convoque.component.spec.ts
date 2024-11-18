import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatsConvoqueComponent } from './candidats-convoque.component';

describe('CandidatsConvoqueComponent', () => {
  let component: CandidatsConvoqueComponent;
  let fixture: ComponentFixture<CandidatsConvoqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CandidatsConvoqueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CandidatsConvoqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

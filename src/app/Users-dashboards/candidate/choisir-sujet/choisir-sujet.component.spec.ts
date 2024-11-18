import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoisirSujetComponent } from './choisir-sujet.component';

describe('ChoisirSujetComponent', () => {
  let component: ChoisirSujetComponent;
  let fixture: ComponentFixture<ChoisirSujetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChoisirSujetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChoisirSujetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormaliteAdministrativeComponent } from './formalite-administrative.component';

describe('FormaliteAdministrativeComponent', () => {
  let component: FormaliteAdministrativeComponent;
  let fixture: ComponentFixture<FormaliteAdministrativeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormaliteAdministrativeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormaliteAdministrativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

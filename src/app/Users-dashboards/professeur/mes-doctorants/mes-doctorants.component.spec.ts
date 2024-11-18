import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesDoctorantsComponent } from './mes-doctorants.component';

describe('MesDoctorantsComponent', () => {
  let component: MesDoctorantsComponent;
  let fixture: ComponentFixture<MesDoctorantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MesDoctorantsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MesDoctorantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

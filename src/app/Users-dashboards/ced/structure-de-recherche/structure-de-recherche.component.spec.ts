import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StructureDeRechercheComponent } from './structure-de-recherche.component';

describe('StructureDeRechercheComponent', () => {
  let component: StructureDeRechercheComponent;
  let fixture: ComponentFixture<StructureDeRechercheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StructureDeRechercheComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StructureDeRechercheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuitarFretboardComponent } from './guitar-fretboard.component';

describe('GuitarFretboardComponent', () => {
  let component: GuitarFretboardComponent;
  let fixture: ComponentFixture<GuitarFretboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuitarFretboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuitarFretboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

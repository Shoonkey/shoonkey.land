import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabLineControlsComponent } from './tab-line-controls.component';

describe('TabLineControlsComponent', () => {
  let component: TabLineControlsComponent;
  let fixture: ComponentFixture<TabLineControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabLineControlsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabLineControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

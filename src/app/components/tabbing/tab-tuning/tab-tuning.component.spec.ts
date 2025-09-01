import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabTuningComponent } from './tab-tuning.component';
import { ComponentRef } from '@angular/core';
import { TabUtility } from '../common/tabbing.util';

describe('TabTuningComponent', () => {
  let component: TabTuningComponent;
  let fixture: ComponentFixture<TabTuningComponent>;
  let ref: ComponentRef<TabTuningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabTuningComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabTuningComponent);
    component = fixture.componentInstance;
    ref = fixture.componentRef;

    ref.setInput("tuning", TabUtility.getStandardTuning("guitar"));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

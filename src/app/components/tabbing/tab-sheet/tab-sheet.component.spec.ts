import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabSheetComponent } from './tab-sheet.component';
import { TabUtility } from '../common/tabbing.util';
import { ComponentRef, input, signal } from '@angular/core';

describe('TabSheetComponent', () => {
  let component: TabSheetComponent;
  let ref: ComponentRef<TabSheetComponent>;
  let fixture: ComponentFixture<TabSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabSheetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabSheetComponent);
    component = fixture.componentInstance;
    ref = fixture.componentRef;

    ref.setInput("content", TabUtility.getBlankTabContent(5));
    ref.setInput("hasTabChanged", false);
    ref.setInput("selectedColumn", null);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

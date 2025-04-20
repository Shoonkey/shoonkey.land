import { ComponentFixture, TestBed } from "@angular/core/testing";

import { TabbingToolComponent } from "./tabbing-tool.component";

describe("TabbingToolComponent", () => {
  let component: TabbingToolComponent;
  let fixture: ComponentFixture<TabbingToolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabbingToolComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TabbingToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});

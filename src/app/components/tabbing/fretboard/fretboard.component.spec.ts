import { ComponentFixture, TestBed } from "@angular/core/testing";

import { FretboardComponent } from "./fretboard.component";
import { ComponentRef } from "@angular/core";
import { TabUtility } from "../common/tabbing.util";

describe("FretboardComponent", () => {
  let component: FretboardComponent;
  let fixture: ComponentFixture<FretboardComponent>;
  let ref: ComponentRef<FretboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FretboardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FretboardComponent);
    component = fixture.componentInstance;
    ref = fixture.componentRef;

    ref.setInput("fretAmount", TabUtility.defaults.fretAmount);
    ref.setInput("instrument", "guitar");
    ref.setInput("tuning", TabUtility.getStandardTuning("guitar"));

    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});

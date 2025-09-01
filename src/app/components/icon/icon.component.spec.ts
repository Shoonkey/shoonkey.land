import { ComponentFixture, TestBed } from "@angular/core/testing";

import { IconComponent } from "./icon.component";
import { ComponentRef } from "@angular/core";

describe("IconComponent", () => {
  let component: IconComponent;
  let fixture: ComponentFixture<IconComponent>;
  let ref: ComponentRef<IconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IconComponent);
    component = fixture.componentInstance;
    ref = fixture.componentRef;

    ref.setInput("name", "x-circle");

    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});

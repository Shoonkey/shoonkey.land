import { ComponentFixture, TestBed } from "@angular/core/testing";

import { SongwritingToolComponent } from "./songwriting-tool.component";

describe("SongwritingToolComponent", () => {
  let component: SongwritingToolComponent;
  let fixture: ComponentFixture<SongwritingToolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SongwritingToolComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SongwritingToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});

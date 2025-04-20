import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivatedRoute } from "@angular/router";

import { NavbarComponent } from "./navbar.component";

describe("NavbarComponent", () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {},
        },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should contain the title 'shoonkey.land'", () => {
    const element = fixture.nativeElement as HTMLElement;
    expect(element.textContent).toContain("shoonkey.land");
  });

  it("should contain the list of tools", () => {
    const element = fixture.nativeElement as HTMLElement;
    const list = element.querySelectorAll("ul li");
    expect(list.length).toBe(2);

    const listItemTitles = Array.from(list).map(elt => elt.textContent);
    expect(listItemTitles).toContain("tabbing");
    expect(listItemTitles).toContain("songwriting");
  });
});

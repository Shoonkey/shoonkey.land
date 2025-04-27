import {
  Component,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  viewChild,
} from "@angular/core";

import { NavbarService } from "../../services/navbar/navbar.service";

@Component({
  selector: "app-homepage",
  imports: [],
  templateUrl: "./homepage.component.html",
  styleUrl: "./homepage.component.css",
})
export class HomepageComponent implements OnInit, OnDestroy {
  private navbarControl = inject(NavbarService);
  private pageContainer =
    viewChild.required<ElementRef<HTMLElement>>("pageContainer");

  ngOnInit(): void {
    this.navbarControl.setNavbarOpen(false);
    setTimeout(() => this.startAnimation(), 400);
  }

  ngOnDestroy(): void {
    this.navbarControl.setNavbarOpen(true);
  }

  startAnimation() {
    this.pageContainer().nativeElement.classList.add("animated");
  }
}

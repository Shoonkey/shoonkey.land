import {
  Component,
  inject,
  OnDestroy,
  OnInit,
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
  protected beginAnimation: boolean = false;

  ngOnInit(): void {
    this.navbarControl.setNavbarOpen(false);
    setTimeout(() => this.beginAnimation = true, 20);
  }

  ngOnDestroy(): void {
    this.navbarControl.setNavbarOpen(true);
  }
}

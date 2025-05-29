import {
  Component,
  inject,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { RouterLink } from "@angular/router";

import { NavbarService } from "../../services/navbar/navbar.service";

@Component({
  selector: "app-homepage",
  imports: [RouterLink],
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

import { Component, inject } from "@angular/core";
import { RouterLink } from "@angular/router";

import { NavbarService } from "../../services/navbar/navbar.service";

// TODO: Add animation for entering and leaving view
@Component({
  selector: "app-navbar",
  imports: [RouterLink],
  templateUrl: "./navbar.component.html",
  styleUrl: "./navbar.component.css"
})
export class NavbarComponent {
  protected control = inject(NavbarService);
}

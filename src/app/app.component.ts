import { Component } from "@angular/core";
import { ActivatedRoute, RouterOutlet } from "@angular/router";

import { NavbarComponent } from "./components/navbar/navbar.component";
import { PageComponent } from "./components/page/page.component";
import { routeTransition } from "./animations/route-transition.animation";

@Component({
  selector: "app-root",
  imports: [RouterOutlet, NavbarComponent, PageComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
  animations: [routeTransition],
})
export class AppComponent {
  route: ActivatedRoute;

  constructor(route: ActivatedRoute) {
    this.route = route;
  }
}

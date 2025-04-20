import { Routes } from "@angular/router";

import { HomepageComponent } from "./pages/homepage/homepage.component";
import { SongwritingToolComponent } from "./pages/songwriting-tool/songwriting-tool.component";
import { TabbingToolComponent } from "./pages/tabbing-tool/tabbing-tool.component";

export const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: HomepageComponent,
  },
  {
    path: "tool",
    children: [
      {
        path: "tabbing",
        component: TabbingToolComponent,
      },
      {
        path: "songwriting",
        component: SongwritingToolComponent,
      },
    ],
  },
];

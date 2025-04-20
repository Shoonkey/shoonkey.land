import {
  transition,
  trigger,
  query,
  style,
  animate,
  group,
} from "@angular/animations";

const styles = {
  base: style({ position: "absolute" }),
  pageIn: style({ opacity: 1, scale: 1 }),
  pageOut: style({ opacity: 0, scale: 0.9 }),
};

const speed = "0.3s";

// should be applied to the parent of the router-outlet component
export const routeTransition = trigger("routeTransition", [
  transition("* => *", [
    group([
      query(":enter, :leave", styles.base, { optional: true }),
      query(":enter", styles.pageOut, { optional: true }),
      query(":enter", animate(speed, styles.pageIn), { optional: true }),
      query(":leave", animate(speed, styles.pageOut), { optional: true }),
    ]),
  ]),
]);

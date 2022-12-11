import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {APP_ROUTES} from "./app-routing.module";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private router: Router) {
  }

  public navigateHome(): void {
    this.router.navigate([APP_ROUTES.HOME.path]);
  }
}

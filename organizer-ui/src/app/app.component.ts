import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {APP_ROUTES} from "./app-routing.module";
import {Theme} from "./enums/theme";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  UI_THEMES = Theme;
  uiTheme: string = Theme.INDIGO_PINK;

  constructor(private router: Router) {
  }

  public applyTheme(): void {
    const body = document.getElementById('index-body');
    if (body) {
      body.className = this.uiTheme + ' mat-typography mat-app-background';
    }
  }

  public navigateHome(): void {
    this.router.navigate([APP_ROUTES.HOME.path]);
  }
}

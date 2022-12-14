import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {APP_ROUTES} from "../../app-routing.module";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  public navigateToTasks(): void {
    this.router.navigate([APP_ROUTES.TASK.path]);
  }

  public navigateToCalendar(): void {
    this.router.navigate([APP_ROUTES.CALENDAR.path]);
  }
}

import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./views/home/home.component";
import {TaskComponent} from "./views/task/task.component";
import {CalendarComponent} from "./views/calendar/calendar.component";

export const APP_ROUTES = {
  HOME: {
    route: 'home',
    path: '/home'
  },
  TASK: {
    route: 'task',
    path: '/task'
  },
  CALENDAR: {
    route: 'calendar',
    path: '/calendar'
  }
}

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: APP_ROUTES.HOME.route, component: HomeComponent},
  {path: APP_ROUTES.TASK.route, component: TaskComponent},
  {path: APP_ROUTES.CALENDAR.route, component: CalendarComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

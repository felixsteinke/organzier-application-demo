import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./views/home/home.component";
import {TaskComponent} from "./views/task/task.component";

export const APP_ROUTES = {
  HOME: {
    route: 'home',
    path: '/home'
  },
  TASK: {
    route: 'task',
    path: '/task'
  }
}

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: APP_ROUTES.HOME.route, component: HomeComponent},
  {path: APP_ROUTES.TASK.route, component: TaskComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

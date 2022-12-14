import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from "./material-module";
import {HomeComponent} from './views/home/home.component';
import {TaskComponent} from './views/task/task.component';
import {ErrorDialogComponent} from './components/error-dialog/error-dialog.component';
import {TaskTableComponent} from './components/task/task-table/task-table.component';
import {TaskItemComponent} from './components/task/task-item/task-item.component';
import {TaskTableV1Component} from './components/task/task-table/task-table-v1/task-table-v1.component';
import {TaskTableV2Component} from './components/task/task-table/task-table-v2/task-table-v2.component';
import {FormsModule} from "@angular/forms";
import {FlexModule} from "@angular/flex-layout";
import {HttpClientModule} from "@angular/common/http";
import {AgGridModule} from "ag-grid-angular";
import {CalendarComponent} from './views/calendar/calendar.component';
import {CalendarPickerComponent} from './components/calendar/calendar-picker/calendar-picker.component';
import {CalendarItemComponent} from './components/calendar/calendar-item/calendar-item.component';
import {CalendarSelectComponent} from './components/calendar/calendar-select/calendar-select.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TaskComponent,
    ErrorDialogComponent,
    TaskTableComponent,
    TaskItemComponent,
    TaskTableV1Component,
    TaskTableV2Component,
    CalendarComponent,
    CalendarPickerComponent,
    CalendarItemComponent,
    CalendarSelectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    FlexModule,
    HttpClientModule,
    AgGridModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

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
import {TaskTableV3Component} from './components/task/task-table/task-table-v3/task-table-v3.component';
import {FormsModule} from "@angular/forms";
import {FlexModule} from "@angular/flex-layout";
import {HttpClientModule} from "@angular/common/http";
import {AgGridModule} from "ag-grid-angular";

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
    TaskTableV3Component
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

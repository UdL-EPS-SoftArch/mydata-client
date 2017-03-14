import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from "@angular/router";

import { routes } from "./app.routing";
import { AppComponent } from './app.component';
import { DatasetFormComponent } from './dataset/dataset-form/dataset-form.component';
import { AboutComponent } from './about/about.component';
import { DatasetService } from "./dataset/dataset.service";
import { LoginBasicModule } from "./login-basic/login-basic.module";
import { AuthenticationBasicService } from "./login-basic/authentication-basic.service";
import { LoggedInGuard } from "./login-basic/loggedin.guard";

@NgModule({
  declarations: [
    AppComponent,
    DatasetFormComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    LoginBasicModule
  ],
  providers: [AuthenticationBasicService, LoggedInGuard, DatasetService],
  bootstrap: [AppComponent]
})
export class AppModule { }

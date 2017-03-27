import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { routes } from './app.routing';
import { AppComponent } from './app.component';
import { DatasetFormComponent } from './dataset/dataset-form/dataset-form.component';
import { AboutComponent } from './about/about.component';
import { DatasetService } from './dataset/dataset.service';
import { LoginBasicModule } from './login-basic/login-basic.module';
import { AuthenticationBasicService } from './login-basic/authentication-basic.service';
import { LoggedInGuard } from './login-basic/loggedin.guard';
import { DatasetsListComponent } from './dataset/datasets-list/datasets-list.component';
import { DatasetDetailsComponent } from './dataset/dataset-details/dataset-details.component';
import { SchemaFormComponent } from './schema/schema-form/schema-form.component';
import { SchemasListComponent } from './schema/schemas-list/schemas-list.component';
import { SchemaDetailsComponent } from './schema/schema-details/schema-details.component';
import { SchemaService } from './schema/schema.service';
import { DatasetsSearchComponent} from './dataset/dataset-search/dataset-search.component';
import { DatasetEditComponent } from './dataset/dataset-edit/dataset-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    DatasetFormComponent,
    AboutComponent,
    DatasetsListComponent,
    DatasetDetailsComponent,
    SchemaFormComponent,
    SchemasListComponent,
    SchemaDetailsComponent,
    DatasetsSearchComponent,
    DatasetEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    LoginBasicModule
  ],
  providers: [AuthenticationBasicService, LoggedInGuard, DatasetService, SchemaService],
  bootstrap: [AppComponent]
})
export class AppModule { }

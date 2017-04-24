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
import { DatasetOwnerService } from './user/dataset-owner.service';
import { OpenLicenseFormComponent } from './license/open-license/open-license-form/open-license-form.component';
import { OpenLicenseListComponent } from './license/open-license/open-license-list/open-license-list.component';
import { OpenLicenseDetailsComponent } from './license/open-license/open-license-details/open-license-details.component';
import { OpenLicenseService } from './license/open-license/open-license.service';
import { SchemaSearchComponent } from './schema/schemas-search/schemas-search.component';
import { ClosedLicenseFormComponent } from './license/closed-license/closed-license-form/closed-license-form.component';
import { ClosedLicenseListComponent } from './license/closed-license/closed-license-list/closed-license-list.component';
import { ClosedLicenseDetailsComponent } from './license/closed-license/closed-license-details/closed-license-details.component';
import { ClosedLicenseService } from './license/closed-license/closed-license.service';
import { OpenLicenseSearchComponent } from './license/open-license/open-license-search/open-license-search.component';
import { ClosedLicenseSearchComponent } from './license/closed-license/closed-license-search/closed-license-search.component';
import { TagService } from './tag/tag.service';
import { TagDetailsComponent } from './tag/tags-details/tags-details.component';
import { TagsListComponent } from './tag/tags-list/tags-list.component';
import { TagFormComponent } from './tag/tags-form/tags-form.component';
import { SchemaEditComponent } from './schema/schema-edit/schema-edit.component';

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
    DatasetEditComponent,
    OpenLicenseFormComponent,
    OpenLicenseListComponent,
    OpenLicenseDetailsComponent,
    SchemaSearchComponent,
    ClosedLicenseFormComponent,
    ClosedLicenseListComponent,
    ClosedLicenseDetailsComponent,
    OpenLicenseSearchComponent,
    ClosedLicenseSearchComponent,
    TagDetailsComponent,
    TagsListComponent,
    TagFormComponent,
    SchemaEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    LoginBasicModule
  ],
  providers: [AuthenticationBasicService, LoggedInGuard, DatasetService, SchemaService, DatasetOwnerService,
              OpenLicenseService, ClosedLicenseService, TagService],
  bootstrap: [AppComponent]
})
export class AppModule { }

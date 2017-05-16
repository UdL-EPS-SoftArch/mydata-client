import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {DatasetFormComponent} from './dataset/dataset-form/dataset-form.component';
import {AboutComponent} from './about/about.component';
import {DatasetsListComponent} from './dataset/datasets-list/datasets-list.component';
import {DatafilesListComponent} from './dataset/datafile-list/datafiles-list.component';
import {DatasetDetailsComponent} from './dataset/dataset-details/dataset-details.component';
import {SchemaFormComponent} from './schema/schema-form/schema-form.component';
import {SchemasListComponent} from './schema/schemas-list/schemas-list.component';
import {SchemaDetailsComponent} from './schema/schema-details/schema-details.component';
import {DatasetsSearchComponent} from './dataset/dataset-search/dataset-search.component';
import {TagsSearchComponent} from './tag/tags-search/tags-search.component';
import {DatasetEditComponent} from './dataset/dataset-edit/dataset-edit.component';
import {OpenLicenseFormComponent} from './license/open-license/open-license-form/open-license-form.component';
import {OpenLicenseListComponent} from './license/open-license/open-license-list/open-license-list.component';
import {OpenLicenseDetailsComponent} from './license/open-license/open-license-details/open-license-details.component';
import {SchemaSearchComponent} from './schema/schemas-search/schemas-search.component';
import {ClosedLicenseFormComponent} from './license/closed-license/closed-license-form/closed-license-form.component';
import {ClosedLicenseListComponent} from './license/closed-license/closed-license-list/closed-license-list.component';
import {ClosedLicenseDetailsComponent} from './license/closed-license/closed-license-details/closed-license-details.component';
import {OpenLicenseSearchComponent} from './license/open-license/open-license-search/open-license-search.component';
import {ClosedLicenseSearchComponent} from './license/closed-license/closed-license-search/closed-license-search.component';
import {TagDetailsComponent} from './tag/tags-details/tags-details.component';
import {TagsListComponent} from './tag/tags-list/tags-list.component';
import {TagFormComponent} from './tag/tags-form/tags-form.component';
import {SchemaEditComponent} from 'app/schema/schema-edit/schema-edit.component';
import {UserDetailComponent} from './user/user-detail/user-detail.component';
import {DatafileDetailsComponent} from './dataset/datafile-list/datafile-details.component';
import {SchemasDatasetListComponent} from './schema/schemas-list/schemas-dataset-list.component';
import {routes} from './app.routing';
import {LoginBasicModule} from 'app/login-basic/login-basic.module';
import {AuthenticationBasicService} from './login-basic/authentication-basic.service';
import {LoggedInGuard} from './login-basic/loggedin.guard';
import {DatasetService} from './dataset/dataset.service';
import {SchemaService} from './schema/schema.service';
import {DatasetOwnerService} from './user/dataset-owner.service';
import {OpenLicenseService} from './license/open-license/open-license.service';
import {ClosedLicenseService} from './license/closed-license/closed-license.service';
import {TagService} from './tag/tag.service';
import {SchemaOwnerService} from './user/schema-owner.service';
import {DataFileService} from './dataset/datafile/datafile.service';
import {UserService} from './user/user.service';

@NgModule({
  declarations: [
    AppComponent,
    DatasetFormComponent,
    AboutComponent,
    DatasetsListComponent,
    DatafilesListComponent,
    DatasetDetailsComponent,
    SchemaFormComponent,
    SchemasListComponent,
    SchemaDetailsComponent,
    DatasetsSearchComponent,
    TagsSearchComponent,
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
    SchemaEditComponent,
    UserDetailComponent,
    DatafileDetailsComponent,
    SchemasDatasetListComponent
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
    OpenLicenseService, ClosedLicenseService, TagService, SchemaOwnerService, DataFileService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule {
}

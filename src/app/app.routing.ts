import { Routes } from '@angular/router';
import { DatasetFormComponent } from './dataset/dataset-form/dataset-form.component';
import { AboutComponent } from './about/about.component';
import { DatasetDetailsComponent } from './dataset/dataset-details/dataset-details.component';
import { DatasetsListComponent } from './dataset/datasets-list/datasets-list.component';
import { SchemasListComponent } from './schema/schemas-list/schemas-list.component';
import { SchemaFormComponent } from './schema/schema-form/schema-form.component';
import { SchemaDetailsComponent } from './schema/schema-details/schema-details.component';
import { DatasetEditComponent } from './dataset/dataset-edit/dataset-edit.component';
import { LoggedInGuard } from './login-basic/loggedin.guard';
import { OpenLicenseListComponent } from './license/open-license/open-license-list/open-license-list.component';
import { OpenLicenseFormComponent } from './license/open-license/open-license-form/open-license-form.component';
import { OpenLicenseDetailsComponent } from './license/open-license/open-license-details/open-license-details.component';
import { ClosedLicenseListComponent } from './license/closed-license/closed-license-list/closed-license-list.component';
import { ClosedLicenseFormComponent } from './license/closed-license/closed-license-form/closed-license-form.component';
import { ClosedLicenseDetailsComponent } from './license/closed-license/closed-license-details/closed-license-details.component';

export const routes: Routes = [
  { path: '', redirectTo: 'about', pathMatch: 'full' },
  { path: 'about', component: AboutComponent },
  { path: 'datasets', component: DatasetsListComponent },
  { path: 'datasets/new', component: DatasetFormComponent },
  { path: 'datasets/:id', component: DatasetDetailsComponent },
  { path: 'datasets/:id/edit', component: DatasetEditComponent, canActivate: [LoggedInGuard] },
  { path: 'schemas', component: SchemasListComponent },
  { path: 'schemas/new', component: SchemaFormComponent },
  { path: 'schemas/:id', component: SchemaDetailsComponent },
  { path: 'openLicenses', component: OpenLicenseListComponent },
  { path: 'openLicenses/new', component: OpenLicenseFormComponent },
  { path: 'openLicenses/:id', component: OpenLicenseDetailsComponent },
  { path: 'closedLicenses', component: ClosedLicenseListComponent },
  { path: 'closedLicenses/new', component: ClosedLicenseFormComponent },
  { path: 'closedLicenses/:id', component: ClosedLicenseDetailsComponent },
];

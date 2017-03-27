import { Routes } from '@angular/router';
import { DatasetFormComponent } from './dataset/dataset-form/dataset-form.component';
import { AboutComponent } from './about/about.component';
import { DatasetDetailsComponent } from './dataset/dataset-details/dataset-details.component';
import { DatasetsListComponent } from './dataset/datasets-list/datasets-list.component';
import { SchemasListComponent } from "./schema/schemas-list/schemas-list.component";
import { SchemaFormComponent } from "./schema/schema-form/schema-form.component";
import { SchemaDetailsComponent } from "./schema/schema-details/schema-details.component";
import {DatasetEditComponent} from "./dataset/dataset-edit/dataset-edit.component";
import { LoggedInGuard } from './login-basic/loggedin.guard';

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
];

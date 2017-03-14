import { Routes } from "@angular/router";
import { DatasetFormComponent } from "./dataset/dataset-form/dataset-form.component";
import { AboutComponent } from "./about/about.component";

export const routes: Routes = [
  { path: '', redirectTo: 'about', pathMatch: 'full' },
  { path: 'about', component: AboutComponent },
  { path: 'datasets/new', component: DatasetFormComponent }
];

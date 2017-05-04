import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockDatasetService } from '../../../test/mocks/dataset.service';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AppComponent } from '../../app.component';
import { DatasetsListComponent } from './datasets-list.component';
import { DatasetService } from '../dataset.service';
import { Dataset } from '../dataset';
import {DatasetOwnerService} from "../../user/dataset-owner.service";
import {MockDatasetOwnerService} from "../../../test/mocks/dataset-owner.service";
import {Owner} from "../../user/owner";

describe('DatasetsListComponent', () => {
  let component: DatasetsListComponent;
  let fixture: ComponentFixture<DatasetsListComponent>;

  const dataset1 = new Dataset({
    'uri': '/datasets/1',
    'title': 'Dataset 1',
    'description': 'First dataset',
    '_links': {
      'owner': { 'href': 'http://localhost/datasets/1/owner' }
    }
  });
  const dataset2 = new Dataset({
    'uri': '/datasets/2',
    'title': 'Dataset 2',
    'description': 'Second dataset',
    '_links': {
      'owner': { 'href': 'http://localhost/datasets/2/owner' }
    }
  });

  const owner = new Owner({
    'uri': 'dataOwners/owner',
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppComponent, DatasetsListComponent ],
      providers: [ { provide: DatasetService, useClass: MockDatasetService },
        {provide: DatasetOwnerService, useClass: MockDatasetOwnerService} ],
      imports: [ RouterTestingModule.withRoutes([
        { path: 'datasets', component: DatasetsListComponent }
      ])],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
  }));

  it('should fetch and render all datasets', async(
    inject([Router, Location, DatasetService, DatasetOwnerService], (router, location, service, datasetOwnerService) => {
      TestBed.createComponent(AppComponent);
      service.setResponse([dataset1, dataset2]);
      datasetOwnerService.setResponse(owner);

      router.navigate(['/datasets']).then(() => {
        expect(location.path()).toBe('/datasets');
        expect(service.getAllDatasetsOrderedByTitle).toHaveBeenCalled();

        fixture = TestBed.createComponent(DatasetsListComponent);
        fixture.detectChanges();
        component = fixture.debugElement.componentInstance;
        expect(component.datasets[0].title).toBe('Dataset 1');
        expect(component.datasets[1].title).toBe('Dataset 2');

        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelectorAll('.panel-heading')[0].innerHTML).toContain('Dataset 1');
        expect(compiled.querySelectorAll('.panel-heading')[1].innerHTML).toContain('Dataset 2');
      });
    })
  ));
});

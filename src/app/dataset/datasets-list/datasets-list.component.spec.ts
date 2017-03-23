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

describe('DatasetsListComponent', () => {
  let component: DatasetsListComponent;
  let fixture: ComponentFixture<DatasetsListComponent>;

  const dataset1 = new Dataset({
    'uri': '/datasets/1',
    'title': 'Dataset 1',
    'description': 'First dataset'
  });
  const dataset2 = new Dataset({
    'uri': '/datasets/2',
    'title': 'Dataset 2',
    'description': 'Second dataset'
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppComponent, DatasetsListComponent ],
      providers: [ { provide: DatasetService, useClass: MockDatasetService } ],
      imports: [ RouterTestingModule.withRoutes([
        { path: 'datasets', component: DatasetsListComponent }
      ])],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
  }));

  it('should fetch and render all datasets', async(
    inject([Router, Location, DatasetService], (router, location, service) => {
      TestBed.createComponent(AppComponent);
      service.setResponse([dataset1, dataset2]);

      router.navigate(['/datasets']).then(() => {
        expect(location.path()).toBe('/datasets');
        expect(service.getAllDatasets).toHaveBeenCalled();

        fixture = TestBed.createComponent(DatasetsListComponent);
        fixture.detectChanges();
        component = fixture.debugElement.componentInstance;
        expect(component.datasets[0].title).toBe('Dataset 1');
        expect(component.datasets[1].title).toBe('Dataset 2');

        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelectorAll('p a')[0].innerHTML).toBe('Dataset 1');
        expect(compiled.querySelectorAll('p a')[1].innerHTML).toBe('Dataset 2');
      });
    })
  ));
});

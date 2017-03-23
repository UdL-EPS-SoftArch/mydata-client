import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockDatasetService } from '../../../test/mocks/dataset.service';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Location } from '@angular/common';
import { Router} from '@angular/router';
import { AppComponent } from '../../app.component';
import { DatasetDetailsComponent } from './dataset-details.component';
import { Dataset } from '../dataset';
import { DatasetService } from '../dataset.service';

describe('DatasetDetailsComponent', () => {
  let fixture: ComponentFixture<DatasetDetailsComponent>;
  let component: DatasetDetailsComponent;

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
      declarations: [ AppComponent, DatasetDetailsComponent ],
      providers: [ { provide: DatasetService, useClass: MockDatasetService } ],
      imports: [ RouterTestingModule.withRoutes([
          { path: 'datasets/:id', component: DatasetDetailsComponent }
        ])],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
  }));

  it('should fetch and render the requested dataset', async(
    inject([Router, Location, DatasetService], (router, location, service) => {
      TestBed.createComponent(AppComponent);
      service.setResponse(dataset1);

      router.navigate(['/datasets/1']).then(() => {
        expect(location.path()).toBe('/datasets/1');
        expect(service.getDataset).toHaveBeenCalledWith('/datasets/1');

        fixture = TestBed.createComponent(DatasetDetailsComponent);
        fixture.detectChanges();
        component = fixture.debugElement.componentInstance;
        expect(component.dataset.title).toBe('Dataset 1');

        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelectorAll('p')[0].innerHTML).toBe('Dataset 1');
        expect(compiled.querySelectorAll('p')[1].innerHTML).toBe('First dataset');
      });
    })
  ));
});

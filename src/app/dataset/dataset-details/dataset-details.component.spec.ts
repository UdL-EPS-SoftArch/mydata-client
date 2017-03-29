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
import { AuthenticationBasicService } from '../../login-basic/authentication-basic.service';
import { DatasetOwnerService } from '../../user/datasetOwner.service';
import { MockAuthenticationBasicService } from '../../../test/mocks/authentication-basic.service';
import { User } from '../../login-basic/user';
import { Owner } from '../../user/owner';
import { MockDatasetOwnerService } from '../../../test/mocks/datasetOwner.service';

describe('DatasetDetailsComponent', () => {
  let fixture: ComponentFixture<DatasetDetailsComponent>;
  let component: DatasetDetailsComponent;

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
      'owner': {'href': 'http://localhost/datasets/2/owner'}
    }
  });
  const owner = new Owner({
    'uri': 'dataOwners/owner',
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppComponent, DatasetDetailsComponent ],
      providers: [
        { provide: DatasetService, useClass: MockDatasetService },
        { provide: AuthenticationBasicService, useClass: MockAuthenticationBasicService },
        { provide: DatasetOwnerService, useClass: MockDatasetOwnerService }],
      imports: [ RouterTestingModule.withRoutes([
          { path: 'datasets/:id', component: DatasetDetailsComponent }
        ])],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
  }));

  it('should fetch and render the requested dataset editable when owner', async(
    inject([Router, Location, DatasetService, DatasetOwnerService, AuthenticationBasicService],
           (router, location, datasetService, datasetOwnerService, authentication) => {
      TestBed.createComponent(AppComponent);
      datasetService.setResponse(dataset1);
      datasetOwnerService.setResponse(owner);
      authentication.isLoggedIn.and.returnValue(true);
      authentication.getCurrentUser.and.returnValue(new User({'username': 'owner'}));

      router.navigate(['/datasets/1']).then(() => {
        expect(location.path()).toBe('/datasets/1');
        expect(datasetService.getDataset).toHaveBeenCalledWith('/datasets/1');
        expect(datasetOwnerService.getDatasetOwner).toHaveBeenCalledWith('http://localhost/datasets/1/owner');

        fixture = TestBed.createComponent(DatasetDetailsComponent);
        fixture.detectChanges();
        component = fixture.debugElement.componentInstance;
        expect(component.dataset.title).toBe('Dataset 1');
        expect(component.isOwner).toBe(true);

        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelectorAll('p')[0].innerHTML).toBe('Dataset 1');
        expect(compiled.querySelectorAll('p')[1].innerHTML).toBe('First dataset');
      });
    })
  ));

  it('should fetch and render the requested dataset non-editable when not owner', async(
    inject([Router, Location, DatasetService, DatasetOwnerService, AuthenticationBasicService],
      (router, location, datasetService, datasetOwnerService, authentication) => {
        TestBed.createComponent(AppComponent);
        datasetService.setResponse(dataset1);
        datasetOwnerService.setResponse(owner);
        authentication.isLoggedIn.and.returnValue(true);
        authentication.getCurrentUser.and.returnValue(new User({'username': 'user'}));

        router.navigate(['/datasets/1']).then(() => {
          expect(datasetService.getDataset).toHaveBeenCalledWith('/datasets/1');
          expect(datasetOwnerService.getDatasetOwner).toHaveBeenCalledWith('http://localhost/datasets/1/owner');

          fixture = TestBed.createComponent(DatasetDetailsComponent);
          fixture.detectChanges();
          component = fixture.debugElement.componentInstance;
          expect(component.dataset.title).toBe('Dataset 1');
          expect(component.isOwner).toBe(false);
        });
      })
  ));
});

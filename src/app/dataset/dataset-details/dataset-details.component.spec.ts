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
import { DatasetOwnerService } from '../../user/dataset-owner.service';
import { MockAuthenticationBasicService } from '../../../test/mocks/authentication-basic.service';
import { User } from '../../login-basic/user';
import { Owner } from '../../user/owner';
import { MockDatasetOwnerService } from '../../../test/mocks/dataset-owner.service';
import { Schema } from '../../schema/schema';
import { SchemaOwnerService } from '../../user/schema-owner.service';
import { SchemaService } from '../../schema/schema.service';
import { MockSchemaOwnerService } from '../../../test/mocks/schema-owner.service';
import { MockSchemaService } from '../../../test/mocks/schema.service';

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

  const schema1 = new Schema({
    'uri': '/schemas/1',
    'title': 'Schema 1',
    'description': 'First schema',
    '_links': {
      'owner': { 'href': 'http://localhost/schemas/1/owner' }
    }
  });
  const schema2 = new Schema({
    'uri': '/schemas/2',
    'title': 'Schema 2',
    'description': 'Second schema',
    '_links': {
      'owner': { 'href': 'http://localhost/schemas/2/owner' }
    }
  });


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppComponent, DatasetDetailsComponent ],
      providers: [
        { provide: DatasetService, useClass: MockDatasetService },
        { provide: AuthenticationBasicService, useClass: MockAuthenticationBasicService },
        { provide: DatasetOwnerService, useClass: MockDatasetOwnerService },
        { provide: SchemaService, useClass: MockSchemaService },
        { provide: SchemaOwnerService, useClass: MockSchemaOwnerService },
        { provide: AuthenticationBasicService, useClass: MockAuthenticationBasicService },],

      imports: [ RouterTestingModule.withRoutes([
          { path: 'datasets/:id', component: DatasetDetailsComponent }
        ])],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
  }));

  it('should fetch and render the requested dataset editable when owner', async(
    inject([Router, Location, DatasetService, DatasetOwnerService, AuthenticationBasicService, SchemaService, AuthenticationBasicService],
           (router, location, datasetService, datasetOwnerService, authentication, schemaService, authenticationService) => {
      TestBed.createComponent(AppComponent);
      datasetService.setResponse(dataset1);
      schemaService.setResponse(schema1)
      datasetOwnerService.setResponse(owner);
      authentication.isLoggedIn.and.returnValue(true);
      authentication.getCurrentUser.and.returnValue(new User({'username': 'owner'}));
      authenticationService.isLoggedIn.and.returnValue(true);
      authenticationService.getCurrentUser.and.returnValue(new User({'username': 'owner'}));

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
    inject([Router, Location, DatasetService, DatasetOwnerService, AuthenticationBasicService,SchemaService, AuthenticationBasicService],
      (router, location, datasetService, datasetOwnerService, authentication, schemaService, authenticationService) => {
        TestBed.createComponent(AppComponent);
        datasetService.setResponse(dataset1);
        schemaService.setResponse(schema1);
        datasetOwnerService.setResponse(owner);
        authentication.isLoggedIn.and.returnValue(true);
        authentication.getCurrentUser.and.returnValue(new User({'username': 'user'}));
        authenticationService.isLoggedIn.and.returnValue(true);
        authenticationService.getCurrentUser.and.returnValue(new User({'username': 'user'}));

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



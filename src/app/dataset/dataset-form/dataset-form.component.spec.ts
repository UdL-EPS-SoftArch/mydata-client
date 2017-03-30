import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockDatasetService } from '../../../test/mocks/dataset.service';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Location } from '@angular/common';
import { Router} from '@angular/router';
import { AppComponent } from '../../app.component';
import { DatasetFormComponent } from './dataset-form.component';
import { DatasetDetailsComponent } from '../dataset-details/dataset-details.component';
import { Dataset } from '../dataset';
import { DatasetService } from '../dataset.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { dispatchEvent } from '@angular/platform-browser/testing/browser_util';
import { AuthenticationBasicService } from '../../login-basic/authentication-basic.service';
import { MockAuthenticationBasicService } from '../../../test/mocks/authentication-basic.service';
import { User } from '../../login-basic/user';
import { DatasetOwnerService } from '../../user/datasetOwner.service';
import { MockDatasetOwnerService } from '../../../test/mocks/datasetOwner.service';
import { Owner } from '../../user/owner';

describe('DatasetFormComponent', () => {
  let component: DatasetFormComponent;
  let fixture: ComponentFixture<DatasetFormComponent>;

  const response = new Dataset({
    'uri': '/datasets/1',
    'title': 'Dataset 1',
    'description': 'First dataset',
    '_links': {
      'owner': {'href': 'http://localhost/datasets/2/owner'}
    }
  });
  const user = new User({
    'username': 'user'
  });
  const owner = new Owner({
    'uri': 'dataOwners/owner',
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppComponent, DatasetFormComponent, DatasetDetailsComponent ],
      providers: [
        { provide: DatasetService, useClass: MockDatasetService },
        { provide: AuthenticationBasicService, useClass: MockAuthenticationBasicService },
        { provide: DatasetOwnerService, useClass: MockDatasetOwnerService }],
      imports: [ RouterTestingModule.withRoutes([
        { path: 'datasets/new', component: DatasetFormComponent },
        { path: 'datasets/:id', component: DatasetDetailsComponent }]),
        FormsModule, ReactiveFormsModule
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
  }));

  it('should submit new dataset', async(
    inject([Router, Location, DatasetService, DatasetOwnerService, AuthenticationBasicService],
           (router, location, datasetService, userService, authentication) => {
      TestBed.createComponent(AppComponent);
      datasetService.setResponse(response);
      userService.setResponse(owner);
      authentication.isLoggedIn.and.returnValue(true);
      authentication.getCurrentUser.and.returnValue(user);

      router.navigate(['/datasets/new']).then(() => {
        expect(location.path()).toBe('/datasets/new');
        expect(datasetService.getDataset).toHaveBeenCalledTimes(0);

        fixture = TestBed.createComponent(DatasetFormComponent);
        fixture.detectChanges();
        component = fixture.debugElement.componentInstance;
        expect(component.dataset.title).toBeUndefined();

        const compiled = fixture.debugElement.nativeElement;
        const inputTitle = compiled.querySelector('#title');
        const inputDescription = compiled.querySelector('#description');
        const form = compiled.querySelector('form');
        const button = compiled.querySelector('button');

        inputTitle.value = 'Dataset 1';
        dispatchEvent(inputTitle, 'input');
        inputDescription.value = 'First Dataset';
        dispatchEvent(inputDescription, 'input');
        fixture.detectChanges();
        expect(button.disabled).toBeFalsy();
        dispatchEvent(form, 'submit');

        expect(component.dataset.title).toBe('Dataset 1');
        expect(component.dataset.description).toBe('First Dataset');
        expect(datasetService.addDataset).toHaveBeenCalledTimes(1);
        expect(datasetService.addDataset.calls.mostRecent().object.fakeResponse.title).toBe('Dataset 1');
        expect(datasetService.addDataset.calls.mostRecent().object.fakeResponse.description).toBe('First dataset');
      });
    })
  ));

  it('should warn if input for title is left empty', async(
    inject([Router, Location, DatasetService], (router, location, service) => {
      TestBed.createComponent(AppComponent);

      router.navigate(['/datasets/new']).then(() => {
        expect(location.path()).toBe('/datasets/new');
        expect(service.getDataset).toHaveBeenCalledTimes(0);

        fixture = TestBed.createComponent(DatasetFormComponent);
        fixture.detectChanges();
        component = fixture.debugElement.componentInstance;

        const compiled = fixture.debugElement.nativeElement;
        const input = compiled.querySelector('#title');
        const button = compiled.querySelector('button');

        input.value = '';
        dispatchEvent(input, 'input');
        dispatchEvent(input, 'blur');
        fixture.detectChanges();

        expect(component.dataset.title).toBe('');
        expect(component.titleCtrl.hasError('required')).toBeTruthy();
        expect(component.titleCtrl.touched).toBeTruthy();
        expect(compiled.querySelector('.label-warning').innerHTML.trim()).toBe('A title is required');
        expect(button.disabled).toBeTruthy();
      });
    })
  ));
});


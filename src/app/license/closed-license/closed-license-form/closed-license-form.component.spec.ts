import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockClosedLicenseService } from '../../../../test/mocks/closed-license.service';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Location } from '@angular/common';
import { Router} from '@angular/router';
import { AppComponent } from '../../../app.component';
import { ClosedLicenseFormComponent } from './closed-license-form.component';
import { ClosedLicenseDetailsComponent } from '../closed-license-details/closed-license-details.component';
import { ClosedLicense } from '../closed-license';
import { ClosedLicenseService } from '../closed-license.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { dispatchEvent } from '@angular/platform-browser/testing/browser_util';

describe('ClosedLicenseFormComponent', () => {
  let component: ClosedLicenseFormComponent;
  let fixture: ComponentFixture<ClosedLicenseFormComponent>;

  const response = new ClosedLicense({
    'uri': '/closedLicenses/1',
    'text': 'License 1',
    'price': 10.0,
    '_links': {}
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppComponent, ClosedLicenseFormComponent, ClosedLicenseDetailsComponent ],
      providers: [ { provide: ClosedLicenseService, useClass: MockClosedLicenseService } ],
      imports: [ RouterTestingModule.withRoutes([
        { path: 'closedLicenses/new', component: ClosedLicenseFormComponent },
        { path: 'closedLicenses/:id', component: ClosedLicenseDetailsComponent }]),
        FormsModule, ReactiveFormsModule
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
  }));

  it('should submit new license', async(
    inject([Router, Location, ClosedLicenseService], (router, location, service) => {
      TestBed.createComponent(AppComponent);
      service.setResponse(response);

      router.navigate(['/closedLicenses/new']).then(() => {
        expect(location.path()).toBe('/closedLicenses/new');
        expect(service.getClosedLicense).toHaveBeenCalledTimes(0);

        fixture = TestBed.createComponent(ClosedLicenseFormComponent);
        fixture.detectChanges();
        component = fixture.debugElement.componentInstance;
        expect(component.closedLicense.text).toBeUndefined();

        const compiled = fixture.debugElement.nativeElement;
        const inputText = compiled.querySelector('#text');
        const inputPrice = compiled.querySelector('#price');
        const form = compiled.querySelector('form');
        const button = compiled.querySelector('button');

        inputText.value = 'License 1';
        dispatchEvent(inputText, 'input');
        inputPrice.value = 10.0;
        dispatchEvent(inputPrice, 'input');
        fixture.detectChanges();
        expect(button.disabled).toBeFalsy();
        dispatchEvent(form, 'submit');

        expect(component.closedLicense.text).toBe('License 1');
        expect(component.closedLicense.price).toBe(10.0);
        expect(service.addClosedLicense).toHaveBeenCalledTimes(1);
        expect(service.addClosedLicense.calls.mostRecent().object.fakeResponse.text).toBe('License 1');
        expect(parseFloat(service.addClosedLicense.calls.mostRecent().object.fakeResponse.price)).toBe(10.0);
      });
    })
  ));

  it('should warn if input for text is left empty', async(
    inject([Router, Location, ClosedLicenseService], (router, location, service) => {
      TestBed.createComponent(AppComponent);

      router.navigate(['/closedLicenses/new']).then(() => {
        expect(location.path()).toBe('/closedLicenses/new');
        expect(service.getClosedLicense).toHaveBeenCalledTimes(0);

        fixture = TestBed.createComponent(ClosedLicenseFormComponent);
        fixture.detectChanges();
        component = fixture.debugElement.componentInstance;

        const compiled = fixture.debugElement.nativeElement;
        const input = compiled.querySelector('#text');
        const button = compiled.querySelector('button');

        input.value = '';
        dispatchEvent(input, 'input');
        dispatchEvent(input, 'blur');
        fixture.detectChanges();

        expect(component.closedLicense.text).toBe('');
        expect(component.textCtrl.hasError('required')).toBeTruthy();
        expect(component.textCtrl.touched).toBeTruthy();
        expect(compiled.querySelector('.label-warning').innerHTML.trim()).toBe('A text is required');
        expect(button.disabled).toBeTruthy();
      });
    })
  ));
});

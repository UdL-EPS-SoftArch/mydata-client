import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockClosedLicenseService } from '../../../../test/mocks/closed-license.service';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Location } from '@angular/common';
import { Router} from '@angular/router';
import { AppComponent } from '../../../app.component';
import { ClosedLicenseDetailsComponent } from './closed-license-details.component';
import { ClosedLicense } from '../closed-license';
import { ClosedLicenseService } from '../closed-license.service';

describe('OpenLicenseDetailsComponent', () => {
  let fixture: ComponentFixture<ClosedLicenseDetailsComponent>;
  let component: ClosedLicenseDetailsComponent;

  const closedLicense1 = new ClosedLicense({
    'uri': '/closedLicenses/1',
    'text': 'License 1',
    'price': '10'
  });
  const closedLicense2 = new ClosedLicense({
    'uri': '/closedLicenses/2',
    'text': 'License 2',
    'price': '50'
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppComponent, ClosedLicenseDetailsComponent ],
      providers: [ { provide: ClosedLicenseService, useClass: MockClosedLicenseService } ],
      imports: [ RouterTestingModule.withRoutes([
          { path: 'closedLicenses/:id', component: ClosedLicenseDetailsComponent }
        ])],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
  }));

  it('should fetch and render the requested openLicense', async(
    inject([Router, Location, ClosedLicenseService], (router, location, service) => {
      TestBed.createComponent(AppComponent);
      service.setResponse(closedLicense1);

      router.navigate(['/closedLicenses/1']).then(() => {
        expect(location.path()).toBe('/closedLicenses/1');
        expect(service.getOpenLicense).toHaveBeenCalledWith('/closedLicenses/1');

        fixture = TestBed.createComponent(ClosedLicenseDetailsComponent);
        fixture.detectChanges();
        component = fixture.debugElement.componentInstance;
        expect(component.closedLicense.text).toBe('License 1');
        expect(component.closedLicense.price).toBe('10');

        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelectorAll('p')[0].innerHTML).toBe('License 1');
      });
    })
  ));
});
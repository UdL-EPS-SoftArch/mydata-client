import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockOpenLicenseService } from '../../../../test/mocks/open-license.service';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Location } from '@angular/common';
import { Router} from '@angular/router';
import { AppComponent } from '../../../app.component';
import { OpenLicenseDetailsComponent } from './open-license-details.component';
import { OpenLicense } from '../open-license';
import { OpenLicenseService } from '../open-license.service';

describe('OpenLicenseDetailsComponent', () => {
  let fixture: ComponentFixture<OpenLicenseDetailsComponent>;
  let component: OpenLicenseDetailsComponent;

  const openLicense1 = new OpenLicense({
    'uri': '/openLicenses/1',
    'text': 'License 1'
  });
  const openLicense2 = new OpenLicense({
    'uri': '/openLicenses/2',
    'text': 'License 2'
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppComponent, OpenLicenseDetailsComponent ],
      providers: [ { provide: OpenLicenseService, useClass: MockOpenLicenseService } ],
      imports: [ RouterTestingModule.withRoutes([
          { path: 'openLicenses/:id', component: OpenLicenseDetailsComponent }
        ])],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
  }));

  it('should fetch and render the requested openLicense', async(
    inject([Router, Location, OpenLicenseService], (router, location, service) => {
      TestBed.createComponent(AppComponent);
      service.setResponse(openLicense1);

      router.navigate(['/openLicenses/1']).then(() => {
        expect(location.path()).toBe('/openLicenses/1');
        expect(service.getLicense).toHaveBeenCalledWith('/openLicenses/1');

        fixture = TestBed.createComponent(OpenLicenseDetailsComponent);
        fixture.detectChanges();
        component = fixture.debugElement.componentInstance;
        expect(component.openLicense.text).toBe('License 1');

        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelectorAll('p')[0].innerHTML).toBe('License 1');
      });
    })
  ));
});

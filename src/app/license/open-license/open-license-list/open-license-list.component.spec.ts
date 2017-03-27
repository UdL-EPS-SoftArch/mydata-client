import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockOpenLicenseService } from '../../../../test/mocks/open-license.service';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AppComponent } from '../../../app.component';
import { OpenLicenseListComponent } from './open-license-list.component';
import { OpenLicenseService } from '../open-license.service';
import { OpenLicense } from '../open-license';

describe('OpenLicenseListComponent', () => {
  let component: OpenLicenseListComponent;
  let fixture: ComponentFixture<OpenLicenseListComponent>;

  const openLicense1 = new OpenLicense({
    'uri': '/openLicenses/1',
    'text': 'Open License 1'
  });
  const openLicense2 = new OpenLicense({
    'uri': '/openLicenses/2',
    'text': 'Open License 2'
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppComponent, OpenLicenseListComponent ],
      providers: [ { provide: OpenLicenseService, useClass: MockOpenLicenseService } ],
      imports: [ RouterTestingModule.withRoutes([
        { path: 'openLicenses', component: OpenLicenseListComponent }
      ])],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
  }));

  it('should fetch and render all openLicenses', async(
    inject([Router, Location, OpenLicenseService], (router, location, service) => {
      TestBed.createComponent(AppComponent);
      service.setResponse([openLicense1, openLicense2]);

      router.navigate(['/openLicenses']).then(() => {
        expect(location.path()).toBe('/openLicenses');
        expect(service.getAllOpenLicensesOrderedByText).toHaveBeenCalled();

        fixture = TestBed.createComponent(OpenLicenseListComponent);
        fixture.detectChanges();
        component = fixture.debugElement.componentInstance;
        expect(component.openLicenses[0].text).toBe('License 1');
        expect(component.openLicenses[1].text).toBe('License 2');

        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelectorAll('.panel-heading')[0].innerHTML).toContain('License 1');
        expect(compiled.querySelectorAll('.panel-heading')[1].innerHTML).toContain('License 2');
      });
    })
  ));
});

import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockClosedLicenseService } from '../../../../test/mocks/closed-license.service';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AppComponent } from '../../../app.component';
import { ClosedLicenseListComponent } from './closed-license-list.component';
import { ClosedLicenseService } from '../closed-license.service';
import { ClosedLicense } from '../closed-license';

describe('ClosedLicenseListComponent', () => {
  let component: ClosedLicenseListComponent;
  let fixture: ComponentFixture<ClosedLicenseListComponent>;

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
      declarations: [ AppComponent, ClosedLicenseListComponent ],
      providers: [ { provide: ClosedLicenseService, useClass: MockClosedLicenseService } ],
      imports: [ RouterTestingModule.withRoutes([
        { path: 'closedLicenses', component: ClosedLicenseListComponent }
      ])],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
  }));

  it('should fetch and render all closedLicenses', async(
    inject([Router, Location, ClosedLicenseService], (router, location, service) => {
      TestBed.createComponent(AppComponent);
      service.setResponse([closedLicense1, closedLicense2]);

      router.navigate(['/closedLicenses']).then(() => {
        expect(location.path()).toBe('/closedLicenses');
        expect(service.getAllClosedLicenses).toHaveBeenCalled();

        fixture = TestBed.createComponent(ClosedLicenseListComponent);
        fixture.detectChanges();
        component = fixture.debugElement.componentInstance;
        expect(component.closedLicenses[0].text).toBe('License 1');
        expect(component.closedLicenses[0].price).toBe(10.0);
        expect(component.closedLicenses[1].text).toBe('License 2');
        expect(component.closedLicenses[1].price).toBe(50.0);

        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelectorAll('.panel-heading')[0].innerHTML).toContain('License 1');
        expect(compiled.querySelectorAll('.panel-heading')[1].innerHTML).toContain('License 2');
      });
    })
  ));
});

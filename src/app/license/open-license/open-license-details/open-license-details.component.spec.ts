import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockLicenseService } from '../../../test/mocks/license.service';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Location } from '@angular/common';
import { Router} from '@angular/router';
import { AppComponent } from '../../app.component';
import { LicenseDetailsComponent } from './license-details.component';
import { License } from '../license';
import { LicenseService } from '../license.service';

describe('LicenseDetailsComponent', () => {
  let fixture: ComponentFixture<LicenseDetailsComponent>;
  let component: LicenseDetailsComponent;

  const license1 = new License({
    'uri': '/licenses/1',
    'text': 'License 1'
  });
  const license2 = new License({
    'uri': '/licenses/2',
    'text': 'License 2'
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppComponent, LicenseDetailsComponent ],
      providers: [ { provide: LicenseService, useClass: MockLicenseService } ],
      imports: [ RouterTestingModule.withRoutes([
          { path: 'licenses/:id', component: LicenseDetailsComponent }
        ])],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
  }));

  it('should fetch and render the requested license', async(
    inject([Router, Location, LicenseService], (router, location, service) => {
      TestBed.createComponent(AppComponent);
      service.setResponse(license1);

      router.navigate(['/licenses/1']).then(() => {
        expect(location.path()).toBe('/licenses/1');
        expect(service.getLicense).toHaveBeenCalledWith('/licenses/1');

        fixture = TestBed.createComponent(LicenseDetailsComponent);
        fixture.detectChanges();
        component = fixture.debugElement.componentInstance;
        expect(component.license.text).toBe('License 1');

        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelectorAll('p')[0].innerHTML).toBe('License 1');
      });
    })
  ));
});

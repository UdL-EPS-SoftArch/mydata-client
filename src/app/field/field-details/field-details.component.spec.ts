import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockFieldService } from '../../../test/mocks/field.service';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Location } from '@angular/common';
import { Router} from '@angular/router';
import { AppComponent } from '../../app.component';
import { FieldDetailsComponent } from './field-details.component';
import { Field } from '../field';
import { FieldService } from '../field.service';

describe('FieldDetailsComponent', () => {
  let fixture: ComponentFixture<FieldDetailsComponent>;
  let component: FieldDetailsComponent;

  const field1 = new Field({
    'uri': '/fields/1',
    'title': 'Field 1',
    'description': 'First field'
  });
  const field2 = new Field({
    'uri': '/fields/2',
    'title': 'Field 2',
    'description': 'Second field'
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppComponent, FieldDetailsComponent ],
      providers: [ { provide: FieldService, useClass: MockFieldService } ],
      imports: [ RouterTestingModule.withRoutes([
        { path: 'fields/:id', component: FieldDetailsComponent }
      ])],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
  }));

  it('should fetch and render the requested field', async(
    inject([Router, Location, FieldService], (router, location, service) => {
      TestBed.createComponent(AppComponent);
      service.setResponse(field1);

      router.navigate(['/fields/1']).then(() => {
        expect(location.path()).toBe('/fields/1');
        expect(service.getField).toHaveBeenCalledWith('/fields/1');

        fixture = TestBed.createComponent(FieldDetailsComponent);
        fixture.detectChanges();
        component = fixture.debugElement.componentInstance;
        expect(component.field.title).toBe('Field 1');

        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelectorAll('p')[0].innerHTML).toBe('Field 1');
        expect(compiled.querySelectorAll('p')[1].innerHTML).toBe('First field');
      });
    })
  ));
});


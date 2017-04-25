import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockFieldService } from '../../../test/mocks/field.service';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Location } from '@angular/common';
import { Router} from '@angular/router';
import { AppComponent } from '../../app.component';
import { FieldFormComponent } from './field-form.component';
import { FieldDetailsComponent } from '../field-details/field-details.component';
import { Field } from '../field';
import { FieldService } from '../field.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { dispatchEvent } from '@angular/platform-browser/testing/browser_util';

describe('FieldFormComponent', () => {
  let component: FieldFormComponent;
  let fixture: ComponentFixture<FieldFormComponent>;

  const response = new Field({
    'uri': '/fields/1',
    'title': 'Field 1',
    'description': 'First field',
    '_links': {}
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppComponent, FieldFormComponent, FieldDetailsComponent ],
      providers: [ { provide: FieldService, useClass: MockFieldService } ],
      imports: [ RouterTestingModule.withRoutes([
        { path: 'fields/new', component: FieldFormComponent },
        { path: 'fields/:id', component: FieldDetailsComponent }]),
        FormsModule, ReactiveFormsModule
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
  }));

  it('should submit new field', async(
    inject([Router, Location, FieldService], (router, location, service) => {
      TestBed.createComponent(AppComponent);
      service.setResponse(response);

      router.navigate(['/fields/new']).then(() => {
        expect(location.path()).toBe('/fields/new');
        expect(service.getField).toHaveBeenCalledTimes(0);

        fixture = TestBed.createComponent(FieldFormComponent);
        fixture.detectChanges();
        component = fixture.debugElement.componentInstance;
        expect(component.field.title).toBeUndefined();

        const compiled = fixture.debugElement.nativeElement;
        const inputTitle = compiled.querySelector('#title');
        const inputDescription = compiled.querySelector('#description');
        const form = compiled.querySelector('form');
        const button = compiled.querySelector('button');

        inputTitle.value = 'Field 1';
        dispatchEvent(inputTitle, 'input');
        inputDescription.value = 'First Field';
        dispatchEvent(inputDescription, 'input');
        fixture.detectChanges();
        expect(button.disabled).toBeFalsy();
        dispatchEvent(form, 'submit');

        expect(component.field.title).toBe('Field 1');
        expect(component.field.description).toBe('First Field');
        expect(service.addField).toHaveBeenCalledTimes(1);
        expect(service.addField.calls.mostRecent().object.fakeResponse.title).toBe('Field 1');
        expect(service.addField.calls.mostRecent().object.fakeResponse.description).toBe('First field');
      });
    })
  ));

  it('should warn if input for title is left empty', async(
    inject([Router, Location, FieldService], (router, location, service) => {
      TestBed.createComponent(AppComponent);

      router.navigate(['/fields/new']).then(() => {
        expect(location.path()).toBe('/fields/new');
        expect(service.getField).toHaveBeenCalledTimes(0);

        fixture = TestBed.createComponent(FieldFormComponent);
        fixture.detectChanges();
        component = fixture.debugElement.componentInstance;

        const compiled = fixture.debugElement.nativeElement;
        const input = compiled.querySelector('#title');
        const button = compiled.querySelector('button');

        input.value = '';
        dispatchEvent(input, 'input');
        dispatchEvent(input, 'blur');
        fixture.detectChanges();

        expect(component.field.title).toBe('');
        expect(component.titleCtrl.hasError('required')).toBeTruthy();
        expect(component.titleCtrl.touched).toBeTruthy();
        expect(compiled.querySelector('.label-warning').innerHTML.trim()).toBe('A title is required');
        expect(button.disabled).toBeTruthy();
      });
    })
  ));
});


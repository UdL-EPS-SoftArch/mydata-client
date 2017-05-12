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
import {Owner} from "../../user/owner";
import {AuthenticationBasicService} from "../../login-basic/authentication-basic.service";
import {MockAuthenticationBasicService} from "../../../test/mocks/authentication-basic.service";
import {FieldOwnerService} from "../../user/field-owner.service";
import {MockFieldOwnerService} from "../../../test/mocks/field-owner.service";
import {User} from "../../login-basic/user";

describe('FieldDetailsComponent', () => {
  let fixture: ComponentFixture<FieldDetailsComponent>;
  let component: FieldDetailsComponent;

  const field1 = new Field({
    'uri': '/',
    //'uri': '/fields/1',
    'title': 'Field 1',
    'description': 'First field',
    '_links': {
      'owner': { 'href': 'http://localhost/fields/1/owner' }
    }
  });
  const field2 = new Field({
    'uri': '/fields/2',
    'title': 'Field 2',
    'description': 'Second field',
    '_links': {
      'owner': { 'href': 'http://localhost/fields/2/owner' }
    }
  });

  const owner = new Owner({
    'uri': 'fieldOwners/owner',
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppComponent, FieldDetailsComponent ],
      providers: [ { provide: FieldService, useClass: MockFieldService },
        { provide: AuthenticationBasicService, useClass: MockAuthenticationBasicService },
        { provide: FieldOwnerService, useClass: MockFieldOwnerService }],
      imports: [ RouterTestingModule.withRoutes([
        { path: 'fields/:id', component: FieldDetailsComponent }
      ])],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
  }));

  it('should fetch and render the requested field editable when owner', async(
    inject([Router, Location, FieldService, FieldOwnerService, AuthenticationBasicService],
      (router, location, fieldService, fieldOwnerService, authentication) => {
        TestBed.createComponent(AppComponent);
        fieldService.setResponse(field1);
        fieldOwnerService.setResponse(owner);
        authentication.isLoggedIn.and.returnValue(true);
        authentication.getCurrentUser.and.returnValue(new User({'username': 'owner'}));

        router.navigate(['/fields/1']).then(() => {
          expect(location.path()).toBe('/fields/1');
          expect(fieldService.getField).toHaveBeenCalledWith('/fields/1');
          expect(fieldOwnerService.getFieldOwner).toHaveBeenCalledWith('http://localhost/fields/1/owner');

          fixture = TestBed.createComponent(FieldDetailsComponent);
          fixture.detectChanges();
          component = fixture.debugElement.componentInstance;
          expect(component.field.title).toBe('Field 1');
          expect(component.isOwner).toBe(true);

          const compiled = fixture.debugElement.nativeElement;
          expect(compiled.querySelectorAll('p')[0].innerHTML).toBe('Field 1');
          expect(compiled.querySelectorAll('p')[1].innerHTML).toBe('First field');
        });
      })
  ));

  it('should fetch and render the requested field non-editable when not owner', async(
    inject([Router, Location, FieldService, FieldOwnerService, AuthenticationBasicService],
      (router, location, fieldService, fieldOwnerService, authentication) => {
        TestBed.createComponent(AppComponent);
        fieldService.setResponse(field1);
        fieldOwnerService.setResponse(owner);
        authentication.isLoggedIn.and.returnValue(true);
        authentication.getCurrentUser.and.returnValue(new User({'username': 'user'}));

        router.navigate(['/fields/1']).then(() => {
          expect(fieldService.getField).toHaveBeenCalledWith('/fields/1');
          expect(fieldOwnerService.getFieldOwner).toHaveBeenCalledWith('http://localhost/fields/1/owner');

          fixture = TestBed.createComponent(FieldDetailsComponent);
          fixture.detectChanges();
          component = fixture.debugElement.componentInstance;
          expect(component.field.title).toBe('Field 1');
          expect(component.isOwner).toBe(false);
        });
      })
  ));

});



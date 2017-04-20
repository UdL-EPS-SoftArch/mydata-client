import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockSchemaService } from '../../../test/mocks/schema.service';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AppComponent } from '../../app.component';
import { SchemasListComponent } from './schemas-list.component';
import { SchemaService } from '../schema.service';
import { Schema } from '../schema';

describe('SchemasListComponent', () => {
  let component: SchemasListComponent;
  let fixture: ComponentFixture<SchemasListComponent>;

  const schema1 = new Schema({
    'uri': '/schemas/1',
    'title': 'Schema 1',
    'description': 'First schema'
  });
  const schema2 = new Schema({
    'uri': '/schemas/2',
    'title': 'Schema 2',
    'description': 'Second schema'
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppComponent, SchemasListComponent ],
      providers: [ { provide: SchemaService, useClass: MockSchemaService } ],
      imports: [ RouterTestingModule.withRoutes([
        { path: 'schemas', component: SchemasListComponent }
      ])],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
  }));

  it('should fetch and render all schemas', async(
    inject([Router, Location, SchemaService], (router, location, service) => {
      TestBed.createComponent(AppComponent);
      service.setResponse([schema1, schema2]);

      router.navigate(['/schemas']).then(() => {
        expect(location.path()).toBe('/schemas');
        expect(service.getAllSchemas).toHaveBeenCalled();

        fixture = TestBed.createComponent(SchemasListComponent);
        fixture.detectChanges();
        component = fixture.debugElement.componentInstance;
        expect(component.schemas[0].title).toBe('Schema 1');
        expect(component.schemas[1].title).toBe('Schema 2');

        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelectorAll('.panel-heading')[0].innerHTML).toContain('Schema 1');
        expect(compiled.querySelectorAll('.panel-heading')[1].innerHTML).toContain('Schema 2');
      });
    })
  ));
});

import {async, TestBed, inject, fakeAsync} from '@angular/core/testing';

import { TagsListComponent } from './tags-list.component';
import { TagService } from '../tag.service';
import { Tag } from '../tag';
import {MockBackend, MockConnection} from "@angular/http/testing";
import {ResponseOptions, Response} from "@angular/http";
import {AppComponent} from "../../app.component";
import {MockTagService} from "../../../test/mocks/tag.service";
import {RouterTestingModule} from "@angular/router/testing";
import {NO_ERRORS_SCHEMA} from "@angular/core";

describe('TagsListComponent', () => {
  const tag1 = new Tag({
    'uri': '/tags/Tag1',
    "name": 'Tag1',
  });
  const tag2 = new Tag({
    'uri': '/tags/Tag2',
    "name": 'Tag2',
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppComponent, TagsListComponent ],
      providers: [ { provide: TagService, useClass: MockTagService } ],
      imports: [ RouterTestingModule.withRoutes([
        { path: 'tags', component: TagsListComponent }
      ])],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
  }));

  describe('#getAllTags()', () => {
    it('should fetch and render all tags', async(
      inject([ MockBackend, TagService ], fakeAsync((mockBackend, service) => {
        const apiResponse = new ResponseOptions({
          body: {
            _embedded: {
              tags: [ tag1, tag2 ]}}});

        mockBackend.connections.subscribe((connection: MockConnection) => {
          expect(connection.request.url).toBe('http://localhost:8080/tags');
          connection.mockRespond(new Response(apiResponse));
        });

        service.getAllTags().subscribe((data) => {
          expect(data.length).toBe(2);
          expect(data[0].name).toEqual(tag1.name);
          expect(data[1].name).toEqual(tag2.name);
        });
      }))));
  });
});

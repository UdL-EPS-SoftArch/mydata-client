import {async, TestBed, inject, fakeAsync, ComponentFixture} from '@angular/core/testing';

import { TagsListComponent } from './tags-list.component';
import { TagService } from '../tag.service';
import { Tag } from '../tag';
import {AppComponent} from "../../app.component";
import {MockTagService} from "../../../test/mocks/tag.service";
import {RouterTestingModule} from "@angular/router/testing";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {Router} from "@angular/router";
import { Location } from '@angular/common';

describe('TagsListComponent', () => {
  let component: TagsListComponent;
  let fixture: ComponentFixture<TagsListComponent>;

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

  it('should fetch and render all tags', async(
    inject([Router, Location, TagService], (router, location, service) => {
      TestBed.createComponent(AppComponent);
      service.setResponse([tag1, tag2]);

      router.navigate(['/tags']).then(() => {
        expect(location.path()).toBe('/tags');
        expect(service.getAllTags).toHaveBeenCalled();

        fixture = TestBed.createComponent(TagsListComponent);
        fixture.detectChanges();
        component = fixture.debugElement.componentInstance;
        expect(component.tags[0].name).toBe('Tag1');
        expect(component.tags[1].name).toBe('Tag2');

        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelectorAll('.panel-heading')[0].innerHTML).toContain('Tag1');
        expect(compiled.querySelectorAll('.panel-heading')[1].innerHTML).toContain('Tag2');
      });
    })
  ));
});

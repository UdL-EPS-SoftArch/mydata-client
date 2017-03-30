import {ComponentFixture, async, TestBed, inject} from "@angular/core/testing";
import {TagDetailsComponent} from "./tags-details.component";
import {Tag} from "../tag";
import {AppComponent} from "../../app.component";
import {TagService} from "../tag.service";
import {MockTagService} from "../../../test/mocks/tag.service";
import {RouterTestingModule} from "@angular/router/testing";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {Router} from "@angular/router";

describe('SchemaDetailsComponent', () => {
  let fixture: ComponentFixture<TagDetailsComponent>;
  let component: TagDetailsComponent;

  const tag1 = new Tag({
    'uri': '/tags/Tag1',
    'name': 'Tag1',
  });
  const tag2 = new Tag({
    'uri': '/tags/Tag2',
    'name': 'Tag2',
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppComponent, TagDetailsComponent ],
      providers: [ { provide: TagService, useClass: MockTagService } ],
      imports: [ RouterTestingModule.withRoutes([
        { path: 'tags/:id', component: TagDetailsComponent }
      ])],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
  }));


}

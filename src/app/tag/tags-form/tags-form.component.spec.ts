import {TagFormComponent} from "./tags-form.component";
import {ComponentFixture, async, TestBed} from "@angular/core/testing";
import {Tag} from "../tag";
import {AppComponent} from "../../app.component";
import {MockTagService} from "../../../test/mocks/tag.service";
import {TagService} from "../tag.service";
import {RouterTestingModule} from "@angular/router/testing";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {TagDetailsComponent} from "../tags-details/tags-details.component";


describe('TagFormComponent', () => {
  let component: TagFormComponent;
  let fixture: ComponentFixture<TagFormComponent>;

  const response = new Tag({
    'uri': '/tags/Tag1',
    'name': 'Tag1',
    '_links': {}
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, TagFormComponent, TagDetailsComponent],
      providers: [{provide: TagService, useClass: MockTagService}],
      imports: [RouterTestingModule.withRoutes([
        {path: 'tags/new', component: TagFormComponent},
        {path: 'tag/:id', component: TagDetailsComponent}]),
        FormsModule, ReactiveFormsModule
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  }));
}

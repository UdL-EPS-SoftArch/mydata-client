import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {TagEditComponent} from "./tags-edit.component";
import {Tag} from "../tag";
import {AppComponent} from "../../app.component";
import {TagDetailsComponent} from "../tags-details/tags-details.component";
import {RouterTestingModule} from "@angular/router/testing";
import {TagService} from "../tag.service";
import {MockTagService} from "../../../test/mocks/tag.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {LoggedInGuard} from "../../login-basic/loggedin.guard";

describe('TagEditComponent', () => {
  let component: TagEditComponent;
  let fixture: ComponentFixture<TagEditComponent>;

  const response = new Tag({
    'uri': '/tafs/1',
    'name': 'Tag1',
    '_links': {}
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, TagEditComponent, TagDetailsComponent],
      providers: [{provide: TagService, useClass: MockTagService}],
      imports: [RouterTestingModule.withRoutes([
        {path: 'tags/:id/edit', component: TagEditComponent, canActivate: [LoggedInGuard]}]),
        FormsModule, ReactiveFormsModule],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

});

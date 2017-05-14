import { CommentFormComponent } from './comment-form.component';
import { ComponentFixture, async, TestBed, inject } from '@angular/core/testing';
import { Comment } from '../comment';
import { AppComponent } from '../../app.component';
import { MockCommentService } from '../../../test/mocks/comment.service';
import { CommentService } from '../comment.service';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CommentDetailsComponent } from '../comment-details/comment-details.component';
import { Router } from '@angular/router';
import { Location } from '@angular/common';


describe('CommentFormComponent', () => {
  let component: CommentFormComponent;
  let fixture: ComponentFixture<CommentFormComponent>;

  const response = new Comment({
    'uri': '/comments/1',
    'text': 'First Comment',
    '_links': {}
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, CommentFormComponent, CommentDetailsComponent],
      providers: [{provide: CommentService, useClass: MockCommentService}],
      imports: [RouterTestingModule.withRoutes([
        {path: 'comments/new', component: CommentFormComponent},
        {path: 'comments/:id', component: CommentDetailsComponent}]),
        FormsModule, ReactiveFormsModule
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  }));

  it('should submit new comment', async(
    inject([Router, Location, CommentService], (router, location, service) => {
      TestBed.createComponent(AppComponent);
      service.setResponse(response);

      router.navigate(['/comments/new']).then(() => {
        expect(location.path()).toBe('/comments/new');
        expect(service.getComment).toHaveBeenCalledTimes(0);

        fixture = TestBed.createComponent(CommentFormComponent);
        fixture.detectChanges();
        component = fixture.debugElement.componentInstance;
        expect(component.comment.dataset).toBeUndefined();

        const compiled = fixture.debugElement.nativeElement;
        const inputName = compiled.querySelector('#name');
        const form = compiled.querySelector('form');
        const button = compiled.querySelector('button');

        inputName.value = 'Comment1';
        inputName.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        expect(button.disabled).toBeFalsy();
        form.dispatchEvent(new Event('submit'));

        expect(component.comment.text).toBe('First Comment');
        expect(service.addComment).toHaveBeenCalledTimes(1);
        expect(service.addComment.calls.mostRecent().object.fakeResponse.text).toBe('First Comment');
      });
    })
  ));

  it('should warn if input for name is left empty', async(
    inject([Router, Location, CommentService], (router, location, service) => {
      TestBed.createComponent(AppComponent);

      router.navigate(['/comments/new']).then(() => {
        expect(location.path()).toBe('/comments/new');
        expect(service.getComment).toHaveBeenCalledTimes(0);

        fixture = TestBed.createComponent(CommentFormComponent);
        fixture.detectChanges();
        component = fixture.debugElement.componentInstance;

        const compiled = fixture.debugElement.nativeElement;
        const input = compiled.quecrySelector('#name');
        const button = compiled.querySelector('button');

        input.value = '';
        input.dispatchEvent(new Event('input'));
        input.dispatchEvent(new Event('blur'));
        fixture.detectChanges();

        expect(component.comment.text).toBe('');
        expect(component.textCtrl.hasError('required')).toBeTruthy();
        expect(component.textCtrl.touched).toBeTruthy();
        expect(compiled.querySelector('.label-warning').innerHTML.trim()).toBe('A text is required');
        expect(button.disabled).toBeTruthy();
      });
    })
  ));
});


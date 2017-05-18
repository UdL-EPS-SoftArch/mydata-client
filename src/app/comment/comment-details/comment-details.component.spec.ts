import {ComponentFixture, async, TestBed, inject} from '@angular/core/testing';
import {CommentDetailsComponent} from './comment-details.component';
import {Comment} from '../comment';
import {AppComponent} from '../../app.component';
import {CommentService} from '../comment.service';
import {MockCommentService} from '../../../test/mocks/comment.service';
import {RouterTestingModule} from '@angular/router/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {AuthenticationBasicService} from '../../login-basic/authentication-basic.service';
import {MockAuthenticationBasicService} from '../../../test/mocks/authentication-basic.service';
import {CommentOwnerService} from '../../user/comment-owner.service';

describe('CommentDetailsComponent', () => {
  let fixture: ComponentFixture<CommentDetailsComponent>;
  let component: CommentDetailsComponent;

  const comment1 = new Comment({
    'uri': '/comments/1',
    'text': 'First comment'
  });
  const comment2 = new Comment({
    'uri': '/comments/2',
    'text': 'Second comment'
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, CommentDetailsComponent],
      providers: [
        {provide: CommentService, useClass: MockCommentService},
        {provide: AuthenticationBasicService, useClass: MockAuthenticationBasicService},
        {provide: CommentOwnerService, useClass: MockCommentService}],
      imports: [RouterTestingModule.withRoutes([
        {path: 'comments/:id', component: CommentDetailsComponent}
      ])],
      schemas: [NO_ERRORS_SCHEMA]
    });
  }));

  it('should fetch and render the requested comment', async(
    inject([Router, Location, CommentService], (router, location, service) => {
      TestBed.createComponent(AppComponent);
      service.setResponse(comment1);

      router.navigate(['/comments/1']).then(() => {
        expect(location.path()).toBe('/comments/1');
        expect(service.getComment).toHaveBeenCalledWith('/comments/1');

        fixture = TestBed.createComponent(CommentDetailsComponent);
        fixture.detectChanges();
        component = fixture.debugElement.componentInstance;
        expect(component.comment.text).toBe('First comment');

        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelectorAll('p')[0].innerHTML).toBe('First comment');
      });
    })
  ));
});

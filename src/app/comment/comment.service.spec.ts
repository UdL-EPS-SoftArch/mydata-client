import {TestBed, inject, async, fakeAsync, tick} from '@angular/core/testing';

import { CommentService } from './comment.service';
import { Comment } from './comment';
import { MockBackend, MockConnection } from '@angular/http/testing';

describe('CommentService', () => {

  const comment1 = new Comment({
    'uri': '/comments/1',
    'text': 'Primer comentari'
  });
  const comment2 = new Comment({
    'uri': '/comments/2',
    'text': 'Second comment'
  });

});

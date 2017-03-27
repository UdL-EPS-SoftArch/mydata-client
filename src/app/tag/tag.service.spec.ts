import {TestBed, inject, async, fakeAsync, tick} from '@angular/core/testing';

import { TagService } from './tag.service';
import { Tag } from './tag';
import { MockBackend, MockConnection } from '@angular/http/testing';
import {
  BaseRequestOptions, Http, XHRBackend, HttpModule, ResponseOptions, Response,
  ConnectionBackend
} from '@angular/http';
import { AuthenticationBasicService } from '../login-basic/authentication-basic.service';

describe('TagService', () => {

  const tag1 = new Tag({
    'uri': '/tags/1',
    'title': 'Tag 1',
  });
  const tag2 = new Tag({
    'uri': '/tags/2',
    'title': 'Tag 2',
  });


});

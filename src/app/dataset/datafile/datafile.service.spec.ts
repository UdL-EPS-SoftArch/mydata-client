import {async, fakeAsync, inject, TestBed} from '@angular/core/testing';

import {DataFileService} from './datafile.service';
import {DataFile} from './datafile';
import {MockBackend, MockConnection} from '@angular/http/testing';
import {BaseRequestOptions, ConnectionBackend, Http, HttpModule, Response, ResponseOptions} from '@angular/http';
import {AuthenticationBasicService} from '../../login-basic/authentication-basic.service';

describe('DataFileService', () => {

  const datafile1 = new DataFile({
    'uri': '/dataFiles/1',
    'title': 'Datafile 1',
    'description': 'First datafile',
    'filename': 'Test file',
    'content': 'Testing content 1'
  });
  const datafile2 = new DataFile({
    'uri': '/dataFiles/2',
    'title': 'Datafile 2',
    'description': 'Second datafile',
    'filename': 'Test file',
    'content': 'Testing content 2'
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        DataFile, AuthenticationBasicService, MockBackend, BaseRequestOptions,
        {
          provide: Http,
          deps: [MockBackend, BaseRequestOptions],
          useFactory: (backend: ConnectionBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backend, defaultOptions);
          }
        }],
      imports: [HttpModule]
    });
  }));

  describe('#getAllDataFiles()', () => {
    it('should return all datafiles',
      inject([MockBackend, DataFileService], fakeAsync((mockBackend, service) => {
        const apiResponse = new ResponseOptions({
          body: {
            _embedded: {
              dataFiles: [datafile1, datafile2]
            }
          }
        });

        mockBackend.connections.subscribe((connection: MockConnection) => {
          expect(connection.request.url).toBe('http://localhost:8080/dataFiles');
          connection.mockRespond(new Response(apiResponse));
        });

        service.getAllDataFiles().subscribe((data) => {
          expect(data.length).toBe(2);
          expect(data[0].title).toEqual(datafile1.title);
          expect(data[1].title).toEqual(datafile2.title);
          expect(data[0].description).toEqual(datafile1.description);
          expect(data[1].description).toEqual(datafile2.description);
        });
      })));
  });

  describe('#getDataFile(uri)', () => {
    it('should return the datafile with provided uri',
      inject([MockBackend, DataFileService], fakeAsync((mockBackend, service) => {
        const apiResponse = new ResponseOptions({
          body: JSON.stringify(datafile1)
        });

        mockBackend.connections.subscribe((connection: MockConnection) => {
          expect(connection.request.url).toBe('http://localhost:8080/dataFiles/1');
          connection.mockRespond(new Response(apiResponse));
        });

        service.getDatafile('/dataFiles/1').subscribe((data) => {
          expect(data.uri).toEqual('/dataFiles/1');
          expect(data.title).toEqual(datafile1.title);
          expect(data.description).toEqual(datafile1.description);
        });
      })));
  });

  describe('#deleteDataFile(datafile)', () => {
    it('should delete the specified datafile',
      inject([MockBackend, DataFileService], fakeAsync((mockBackend, service) => {
        const apiResponse = new ResponseOptions({
          status: 204
        });

        mockBackend.connections.subscribe((connection: MockConnection) => {
          expect(connection.request.url).toBe('http://localhost:8080/datafiles/1');
          connection.mockRespond(new Response(apiResponse));
        });

        service.deleteDataFile(datafile1).subscribe((response) => {
          expect(response.status).toEqual(204);
        });
      })));
  });
});

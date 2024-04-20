import { TestBed } from '@angular/core/testing';

import { SocketDiagramService } from './socket-diagram.service';

describe('SocketDiagramService', () => {
  let service: SocketDiagramService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SocketDiagramService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

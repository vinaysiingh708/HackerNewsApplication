import { TestBed } from '@angular/core/testing';
import { HackerNewsService, NewsStory } from '../app/hacker-news.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('HackerNewsService', () => {
  let service: HackerNewsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HackerNewsService],
    });

    service = TestBed.inject(HackerNewsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch new stories', () => {
    const dummyStories: NewsStory[] = [
      { Id: '1', Title: 'Story 1', Url: 'Content 1' },
      { Id: '2', Title: 'Story 2', Url: 'Content 2' },
    ];

    service.getNewStories().subscribe((stories) => {
      expect(stories.length).toBe(2);
      expect(stories).toEqual(dummyStories);
    });

    const req = httpMock.expectOne(`${service.baseUrl}/newstories`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyStories);
  });


});

import { Injectable } from '@angular/core';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface NewsStory {
  Id: string;
  Title: string;
  Url: string;
}

@Injectable({
  providedIn: 'root'
})
export class HackerNewsService {
  private baseUrl = 'http://localhost:5018/api/hackernews'; // Update with your API base URL

  constructor(private http: HttpClient) { }

  getNewStories(): Observable<NewsStory[]> {
    return this.http.get<NewsStory[]>(`${this.baseUrl}/newstories`);
  }

}

import { inject, Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Bookmark } from '../../models/bookmark';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {

  private http = inject(HttpClient);
  private baseUrl = 'api/bookmarks';

  getAllBookmarks(): Observable<Bookmark[]> {
    return this.http.get<Bookmark[]>('api/bookmarks');
  }

  getBookmarkById(id: number): Observable<Bookmark> {
    return this.http.get<Bookmark>(`${this.baseUrl}/${id}`);
  }

  addBookmark(bookmark: Bookmark): Observable<Bookmark> {
    return this.http.post<Bookmark>(this.baseUrl, bookmark);
  }

  updateBookmark(bookmark: Bookmark): Observable<Bookmark> {
    return this.http.put<Bookmark>(`${this.baseUrl}/${bookmark.id}`, bookmark);
  }
}

import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Bookmark } from '../../models/bookmark';

@Injectable({
  providedIn: 'root'
})
export class MemoryData implements InMemoryDbService {
  
  createDb() {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const bookmarks: Bookmark[] = [
      {
        id: 1,
        title: 'Angular',
        url: 'https://angular.io',
        dateAdded: today.toString()
      },
      {
        id: 2, 
        title: 'NgRx', 
        url: 'https://ngrx.io',
        dateAdded: yesterday.toString()
      },
      {
        id: 3, 
        title: 'Typescript', 
        url: 'https://www.typescriptlang.org',
        dateAdded: new Date('27/07/2052').toString()
      },
      {
        id: 4, 
        title: 'RxJS', 
        url: 'https://rxjs.dev',
        dateAdded: new Date('27/07/2052').toString()
      }
    ];
    return { bookmarks };
  }

  genId(bookmarks: Bookmark[]): number {
    return (Math.max(...bookmarks.map(b => +b.id), 0) + 1);
  }
}

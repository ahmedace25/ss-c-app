import { Component, computed, inject, model } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { Bookmark } from '../../@core/models/bookmark';
import { BookmarkActions, BookmarkSelectors } from '../../state/bookmark/action-types';
import { AsyncPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { BookmarkGroups } from '../../@core/models/bookmark';
import { MatListModule } from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-bookmark-list',
  imports: [AsyncPipe, MatCardModule, MatIcon, MatButtonModule, RouterLink, MatListModule, MatFormFieldModule, MatInputModule, FormsModule],
  templateUrl: './bookmark-list.html',
  styleUrl: './bookmark-list.scss'
})
export class BookmarkList {

  private store = inject(Store);

  bookmarks$: Observable<Bookmark[]> = this.store.select(BookmarkSelectors.selectAllBookmarks);
  bookmarksSignal = toSignal(this.bookmarks$, { initialValue: [] });
  searchTerm = model('');

  groupedBookmarks$: Observable<BookmarkGroups> = this.bookmarks$.pipe(
    map(bookmarks => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);
      const categories: BookmarkGroups = {
        today: [],
        yesterday: [],
        older: []
      };

      bookmarks.forEach(bookmark => {
        const dateAdded = new Date(bookmark.dateAdded);
        dateAdded.setHours(0, 0, 0, 0);

        if (dateAdded.getTime() === today.getTime()) {
          categories.today.push(bookmark);
        } else if (dateAdded.getTime() === yesterday.getTime()) {
          categories.yesterday.push(bookmark);
        } else {
          categories.older.push(bookmark);
        }
      });

      return categories;
    })
  );

  filteredBookmarks = computed(() => 
    this.bookmarksSignal().filter(bookmark => 
      bookmark.title.toLowerCase().includes(this.searchTerm().toLowerCase())
    )
  );

  ngOnInit(): void {
    this.store.dispatch(BookmarkActions.loadBookmarks());
  }
}

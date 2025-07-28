import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { BookmarkActions, BookmarkSelectors } from '../../state/bookmark/action-types';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Bookmark } from '../../@core/models/bookmark';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bookmark-edit',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIcon,
    ReactiveFormsModule],
  templateUrl: './bookmark-edit.html',
  styleUrl: './bookmark-edit.scss'
})
export class BookmarkEdit {
  private store = inject(Store);
  private route = inject(ActivatedRoute);

  bookmark$!: Observable<Bookmark | null | undefined>;
  bookmark!: Bookmark;

  bookmarkForm = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    url: new FormControl<string>('', [Validators.required])
  });

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.store.dispatch(BookmarkActions.loadBookmark({ id: parseInt(id) }));
      this.bookmark$ = this.store.select(BookmarkSelectors.selectSelectedBookmark);
      this.bookmark$.subscribe(bookmark => {
        if (bookmark) {
          this.bookmark = bookmark;
          this.bookmarkForm.controls.name.setValue(bookmark.title);
          this.bookmarkForm.controls.url.setValue(bookmark.url);
        }
      })
    } else {
      this.bookmark$ = this.store.select(() => null);
    }
  }

  updateBookmark(): void {
    if (this.bookmarkForm.valid) {
      const bookmark = {
        id: this.bookmark.id,
        title: this.bookmarkForm.controls.name.value!,
        url: this.bookmarkForm.controls.url.value!,
        dateAdded: this.bookmark.dateAdded
      };
      this.store.dispatch(BookmarkActions.updateBookmark({ bookmark }));
    }
  }
}

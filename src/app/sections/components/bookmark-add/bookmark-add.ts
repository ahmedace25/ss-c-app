import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { BookmarkActions } from '../../state/bookmark/action-types';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Bookmark } from '../../@core/models/bookmark';

@Component({
  selector: 'app-bookmark-add',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIcon,
    ReactiveFormsModule
  ],
  templateUrl: './bookmark-add.html',
  styleUrl: './bookmark-add.scss'
})
export class BookmarkAdd {
  private store = inject(Store);

  bookmarkForm = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    url: new FormControl<string>('', [Validators.required])
  });

  addBookmark(): void {
    if (this.bookmarkForm.valid) {
      const todaysDate = new Date();
      const bookmark = {
        title: this.bookmarkForm.controls.name.value!,
        url: this.bookmarkForm.controls.url.value!,
        dateAdded: todaysDate.toString()
      } as Bookmark;
      this.store.dispatch(BookmarkActions.addBookmark({ bookmark }));
    }
  }
}

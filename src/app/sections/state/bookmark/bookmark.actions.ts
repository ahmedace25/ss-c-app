import { createAction, props } from '@ngrx/store';
import { Bookmark } from '../../@core/models/bookmark';

export const loadBookmarks = createAction("[Bookmarks List] Load Bookmarks");
export const loadBookmarksSuccess = createAction(
    '[Bookmarks API] Load Bookmarks Success',
    props<{ bookmarks: Bookmark[] }>()
);

export const addBookmark = createAction(
    "[Add Bookmark Page] Add Bookmark",
    props<{ bookmark: Bookmark }>()
);
export const addBookmarkSuccess = createAction(
    '[Bookmarks API] Add Bookmark Success',
    props<{ bookmark: Bookmark }>()
);

export const loadBookmark = createAction(
    "[Load Bookmark Page] Load Bookmark",
    props<{ id: number }>()
);
export const loadBookmarkSuccess = createAction(
    '[Bookmarks API] Load Bookmark Success',
    props<{ bookmark: Bookmark }>()
);

export const updateBookmark = createAction(
    "[Update Bookmark Page] Update Bookmark",
    props<{ bookmark: Bookmark }>()
);
export const updateBookmarkSuccess = createAction(
    '[Bookmarks API] Update Bookmark Success',
);



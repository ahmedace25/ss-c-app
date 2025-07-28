import { createReducer, on } from "@ngrx/store";
import { Bookmark } from "../../@core/models/bookmark";
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { BookmarkActions } from "./action-types";

export interface BookmarkState extends EntityState<Bookmark> {
    selectedBookmarkId: number | null;
};

export const adapter = createEntityAdapter<Bookmark>();

export const initialState: BookmarkState = adapter.getInitialState({
    selectedBookmarkId: null
});

export const bookmarkReducer = createReducer(
    initialState,
    on(BookmarkActions.loadBookmarksSuccess, (state, { bookmarks }) => adapter.setAll(bookmarks, state)),
    on(BookmarkActions.addBookmarkSuccess, (state, { bookmark }) => adapter.addOne(bookmark, state)),
    on(BookmarkActions.loadBookmarkSuccess, (state, { bookmark }) => ({
        ...adapter.upsertOne(bookmark, state),
        selectedBookmarkId: bookmark.id
    }))
);
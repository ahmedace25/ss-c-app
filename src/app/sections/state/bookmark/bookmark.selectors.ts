import { createFeatureSelector, createSelector } from "@ngrx/store";
import { adapter, BookmarkState } from "./bookmark.reducer";

export const selectBookmarkState = createFeatureSelector<BookmarkState>('bookmarks');

const { selectAll, selectEntities } = adapter.getSelectors(selectBookmarkState);

export const selectAllBookmarks = selectAll;
export const selectBookmarkEntities = selectEntities;

export const selectSelectedBookmarkId = createSelector(
    selectBookmarkState,
    state => state.selectedBookmarkId
);

export const selectSelectedBookmark = createSelector(
    selectBookmarkEntities,
    selectSelectedBookmarkId,
    (entities, id) => (id ? entities[id] : null)
);



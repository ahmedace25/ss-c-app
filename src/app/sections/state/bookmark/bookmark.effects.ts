import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { BookmarkService } from "../../@core/services/bookmark/bookmark";
import { BookmarkActions } from "./action-types";
import { map, switchMap, tap } from "rxjs";
import { Router } from "@angular/router";
import { LoaderService } from "../../../shared/services/loader/loader-service";

@Injectable()
export class BookmarkEffects {
    private actions$ = inject(Actions);
    private bookmarkService = inject(BookmarkService);
    private router = inject(Router);
    private loader = inject(LoaderService);

    loadBookmarks$ = createEffect(() => 
        this.actions$.pipe(
            ofType(BookmarkActions.loadBookmarks),
            switchMap(() => this.bookmarkService.getAllBookmarks().pipe(
                this.loader.attachLoader(),
                map(bookmarks => BookmarkActions.loadBookmarksSuccess({ bookmarks }))
            ))
        )
    );

    addBookmark$ = createEffect(() => 
        this.actions$.pipe(
            ofType(BookmarkActions.addBookmark),
            switchMap(action => this.bookmarkService.addBookmark(action.bookmark).pipe(
                this.loader.attachLoader(),
                tap(() => this.router.navigate(['/bookmarks'])),
                map(bookmark => BookmarkActions.addBookmarkSuccess({ bookmark }))
            ))
        )
    );

    updateBookmark$ = createEffect(() => 
        this.actions$.pipe(
            ofType(BookmarkActions.updateBookmark),
            switchMap(action => this.bookmarkService.updateBookmark(action.bookmark).pipe(
                this.loader.attachLoader(),
                tap(() => this.router.navigate(['/bookmarks'])),
                map(() => BookmarkActions.updateBookmarkSuccess())
            ))
        )
    );

    loadBookmark$ = createEffect(() => 
        this.actions$.pipe(
            ofType(BookmarkActions.loadBookmark),
            switchMap(action => this.bookmarkService.getBookmarkById(action.id).pipe(
                this.loader.attachLoader(),
                map(bookmark => BookmarkActions.loadBookmarkSuccess({ bookmark }))
            ))
        )
    );
}
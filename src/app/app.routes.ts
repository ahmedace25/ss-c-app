import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'bookmarks', pathMatch: 'full'},
    { 
        path: 'bookmarks',
        loadComponent: () => import('./sections/components/bookmark-list/bookmark-list').then((m) => m.BookmarkList),
        pathMatch: 'full',
        data: { title: 'Bookmarkers'}
    },
    { 
        path: 'bookmark/:id',
        loadComponent: () => import('./sections/components/bookmark-edit/bookmark-edit').then((m) => m.BookmarkEdit),
        pathMatch: 'full',
        data: { title: 'Edit Bookmark'}
    },
    { 
        path: 'add-bookmark',
        loadComponent: () => import('./sections/components/bookmark-add/bookmark-add').then((m) => m.BookmarkAdd),
        pathMatch: 'full',
        data: { title: 'Add Bookmark'}
    },
];

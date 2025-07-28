export interface Bookmark {
    id: number,
    title: string,
    url: string,
    dateAdded: string
}

export interface BookmarkGroups {
    today: Bookmark[],
    yesterday: Bookmark[],
    older: Bookmark[]
}
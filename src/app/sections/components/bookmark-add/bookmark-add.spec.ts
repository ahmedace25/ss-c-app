import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmarkAdd } from './bookmark-add';

describe('BookmarkAdd', () => {
  let component: BookmarkAdd;
  let fixture: ComponentFixture<BookmarkAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookmarkAdd]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookmarkAdd);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

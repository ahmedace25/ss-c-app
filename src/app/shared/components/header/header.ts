import { Component, inject } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, map } from 'rxjs';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  currentPath = toSignal(this.router.events.pipe(
    map(() => this.router.url.split('/')[1])
  ), { initialValue: this.router.url.split('/')[1] });

  title = 'Bookmarks';

  constructor() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        let current = this.route;
        while (current.firstChild) {
          current = current.firstChild;
        }
        this.title = current.snapshot.data['title'] ?? 'Bookmarks';
      });
  }
}

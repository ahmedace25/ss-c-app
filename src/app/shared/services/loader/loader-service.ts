import { Injectable, inject, Injector } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Loader } from '../../components/loader/loader';
import { finalize, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private overlay = inject(Overlay);
  private injector = inject(Injector);

  private overlayRef: OverlayRef | null = null;
  private activeRequests = 0;

  private showOverlay() {
    if (!this.overlayRef) {
      this.overlayRef = this.overlay.create({
        hasBackdrop: true,
        backdropClass: 'transparent-backdrop',
        positionStrategy: this.overlay
          .position()
          .global()
          .centerHorizontally()
          .centerVertically(),
        scrollStrategy: this.overlay.scrollStrategies.block(),
      });

      const spinnerPortal = new ComponentPortal(
        Loader,
        null,
        this.injector
      );
      this.overlayRef.attach(spinnerPortal);
    }
  }

  private hideOverlay() {
    if (this.overlayRef) {
      this.overlayRef.detach();
      this.overlayRef = null;
    }
  }

  attachLoader<T>() {
    return (source$: Observable<T>) => {
      this.activeRequests++;

      if (this.activeRequests === 1) {
        this.showOverlay();
      }

      return source$.pipe(
        finalize(() => {
          this.activeRequests = Math.max(0, this.activeRequests - 1);
          if (this.activeRequests === 0) {
            this.hideOverlay();
          }
        })
      );
    };
  }
}

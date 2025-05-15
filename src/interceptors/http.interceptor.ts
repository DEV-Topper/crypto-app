import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { LoadingController } from '@ionic/angular';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  private loading: HTMLIonLoadingElement | null = null;
  private activeRequests = 0;

  constructor(private loadingController: LoadingController) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    this.activeRequests++;

    if (this.activeRequests === 1) {
      this.showLoading();
    }

    request = request.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An error occurred';

        if (error.error instanceof ErrorEvent) {
          errorMessage = error.error.message;
        } else {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }

        switch (error.status) {
          case 401:
            break;
          case 403:
            break;
          case 404:
            break;
          case 500:
            break;
        }

        return throwError(() => error);
      }),
      finalize(() => {
        this.activeRequests--;
        if (this.activeRequests === 0) {
          this.hideLoading();
        }
      }),
    );
  }

  private async showLoading() {
    this.loading = await this.loadingController.create({
      message: 'Loading...',
      spinner: 'circular',
      translucent: true,
      backdropDismiss: false,
    });
    await this.loading.present();
  }

  private async hideLoading() {
    if (this.loading) {
      await this.loading.dismiss();
      this.loading = null;
    }
  }
}

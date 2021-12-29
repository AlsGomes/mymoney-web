import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { from, mergeMap, Observable } from "rxjs";
import { ErrorHandlerService, NotAuthenticatedError } from "../core/error-handler.service";
import { AuthService } from "./auth.service";

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {

    constructor(
        private auth: AuthService,
        private errorHandler: ErrorHandlerService,
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!req.url.includes('/oauth/token') && this.auth.isInvalidAccessToken()) {
            return from(this.auth.renewAccessToken())
                .pipe(
                    mergeMap(() => {
                        if (this.auth.isInvalidAccessToken()) {
                            this.errorHandler.handle(new NotAuthenticatedError());
                        }
                        req = req.clone({
                            setHeaders: {
                                Authorization: `Bearer ${localStorage.getItem('token')}`
                            }
                        });

                        return next.handle(req);
                    })
                );
        }

        return next.handle(req);
    }
}
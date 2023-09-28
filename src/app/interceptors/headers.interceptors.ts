import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";


@Injectable()
export class HeadersInterceptor implements HttpInterceptor {



  intercept(req: HttpRequest<any>, next: HttpHandler) {
    
    let language = localStorage.getItem('language') as string;

    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    const authReq = req.clone({
      headers: req.headers
      .append('X-RapidAPI-Key', '957ce914ccmsh842568736aad1f6p18a1eejsn6fd93770c3a4')
      .append('X-RapidAPI-Host', 'one-piece-episodes.p.rapidapi.com'),
      params: req.params.append('language', language)
    });

    // send cloned request with header to the next handler.
    return next.handle(authReq);
  }
}
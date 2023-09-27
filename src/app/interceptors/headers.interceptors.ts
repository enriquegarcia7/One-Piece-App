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
      .append('X-RapidAPI-Key', 'f5e9cd75e5msh40ea0131d60a63ap1899a7jsn587a7b848cec')
      .append('X-RapidAPI-Host', 'one-piece-episodes.p.rapidapi.com'),
      params: req.params.append('language', language)
    });

    // send cloned request with header to the next handler.
    return next.handle(authReq);
  }
}